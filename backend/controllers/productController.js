const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');

//Get Products - /api/v1/products
// exports.getProducts = catchAsyncError(async (req, res, next)=>{
//     const resPerPage = 3;
    
//     let buildQuery = () => {
//         return new APIFeatures(Product.find(), req.query).search().filter()
//     }
    
//     const filteredProductsCount = await buildQuery().query.countDocuments({})
//     const totalProductsCount = await Product.countDocuments({});
//     let productsCount = totalProductsCount;

//     if(filteredProductsCount !== totalProductsCount) {
//         productsCount = filteredProductsCount;
//     }
    
//     const products = await buildQuery().paginate(resPerPage).query;

//     res.status(200).json({
//         success : true,
//         count: productsCount,
//         resPerPage,
//         products
//     })
// })

exports.getProducts = catchAsyncError(async (req, res, next) => {
    const resPerPage = 3;
    const { keyword, category, price, ratings, page = 1 } = req.query;

    // Build the base query
    let query = {};

    // Keyword search
    if (keyword) {
        query.name = {
            $regex: keyword,
            $options: 'i'
        };
    }
    if (req.query.category) {
        query.category = {
            $regex: new RegExp(`^${req.query.category}$`, 'i') // Exact match, case insensitive
        };
    // Category filter - exact match (case insensitive)
    if (category) {
        query.category = {
            $regex: new RegExp(`^${category}$`, 'i')
        };
    }

    // Price filter
    if (price) {
        const [minPrice, maxPrice] = price.split(',');
        query.price = {
            $gte: parseFloat(minPrice),
            $lte: parseFloat(maxPrice)
        };
    }

    // Ratings filter
    if (ratings) {
        query.ratings = {
            $gte: parseFloat(ratings)
        };
    }
    // In your getProducts controller:

}

    // Get counts
    const productsCount = await Product.countDocuments(query);
    const currentPage = Number(page);
    const skip = resPerPage * (currentPage - 1);

    // Execute query with pagination
    const products = await Product.find(query)
        .limit(resPerPage)
        .skip(skip);

    res.status(200).json({
        success: true,
        count: productsCount,
        resPerPage,
        products
    });
});
//Create Product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next)=>{
    let images = []
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    
    if(req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/uploads/product/${file.originalname}`;
            images.push({ image: url })
        })
    }

    req.body.images = images;

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

//Get Single Product - api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id).populate('reviews.user','name email');

    if(!product) {
        return next(new ErrorHandler('Product not found', 400));
    }

    res.status(201).json({
        success: true,
        product
    })
})

//Update Product - api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    //uploading images
    let images = []

    //if images not cleared we keep existing images
    if(req.body.imagesCleared === 'false' ) {
        images = product.images;
    }
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/uploads/product/${file.originalname}`;
            images.push({ image: url })
        })
    }


    req.body.images = images;
    
    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })

})

//Delete Product - api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted!"
    })

})

//Create Review - api/v1/review
// exports.createReview = catchAsyncError(async (req, res, next) =>{
//     const  { productId, rating, comment } = req.body;

//     const review = {
//         user : req.user.id,
//         rating,
//         comment
//     }

//     const product = await Product.findById(productId);
//    //finding user review exists
//     const isReviewed = product.reviews.find(review => {
//        return review.user.toString() == req.user.id.toString()
//     })

//     if(isReviewed){
//         //updating the  review
//         product.reviews.forEach(review => {
//             if(review.user.toString() == req.user.id.toString()){
//                 review.comment = comment
//                 review.rating = rating
//             }

//         })

//     }else{
//         //creating the review
//         product.reviews.push(review);
//         product.numOfReviews = product.reviews.length;
//     }
//     //find the average of the product reviews
//     product.ratings = product.reviews.reduce((acc, review) => {
//         return review.rating + acc;
//     }, 0) / product.reviews.length;
//     product.ratings = isNaN(product.ratings)?0:product.ratings;

//     await product.save({validateBeforeSave: false});

//     res.status(200).json({
//         success: true
//     })


// })

// controllers/productController.js
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id; // Ensure you're getting the logged-in user

    // Validate input
    if (!productId || !rating || !comment) {
        return next(new ErrorHandler('Please provide all review fields', 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
        review => review.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
        // Update existing review
        product.reviews.forEach(review => {
            if (review.user.toString() === userId.toString()) {
                review.rating = rating;
                review.comment = comment;
            }
        });
    } else {
        // Add new review
        product.reviews.push({
            user: userId,
            rating: Number(rating),
            comment
        });
        product.numOfReviews = product.reviews.length;
    }

    // Calculate average rating
    product.ratings = product.reviews.reduce(
        (acc, item) => item.rating + acc, 0
    ) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: 'Review submitted successfully'
    });
});
//Get Reviews - api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) =>{
    const product = await Product.findById(req.query.id).populate('reviews.user','name email');

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) =>{
    const product = await Product.findById(req.query.productId);
    
    //filtering the reviews which does match the deleting review id
    const reviews = product.reviews.filter(review => {
       return review._id.toString() !== req.query.id.toString()
    });
    //number of reviews 
    const numOfReviews = reviews.length;

    //finding the average with the filtered reviews
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    //save the product document
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true
    })


});

// get admin products  - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) =>{
    const products = await Product.find();
    res.status(200).send({
        success: true,
        products
    })
});



// const Product = require('../models/productModel');
// const ErrorHandler = require('../utils/errorHandler');
// const catchAsyncError = require('../middlewares/catchAsyncError');
// const APIFeatures = require('../utils/apiFeatures');

// // Get all products with filtering
// // Fix the ratings typo and adjust price filtering
// exports.getProducts = catchAsyncError(async (req, res, next) => {
//     console.log('Received query:', req.query);

//     const resPerPage = 8;
//     const { keyword, category, price, ratings } = req.query;

//     const query = {};

//     if (keyword) {
//         query.name = {
//             $regex: keyword,
//             $options: 'i'
//         };
//     }

//     if (category) {
//         query.category = category;
//     }

//     if (price) {
//         const [minPrice, maxPrice] = price.split(',');
//         query.price = {
//             $gte: parseFloat(minPrice || 1),
//             $lte: parseFloat(maxPrice || 100000)
//         };
//     }

//     if (ratings) {
//         query.ratings = {
//             $gte: parseFloat(ratings)
//         };
//     }

//     // Fix: Handle page='null' or undefined
//     const pageQuery = req.query.page;
//     const currentPage = (pageQuery === 'null' || !pageQuery) ? 1 : parseInt(pageQuery);

//     const skip = resPerPage * (currentPage - 1);

//     const productsCount = await Product.countDocuments(query);

//     const products = await Product.find(query)
//         .limit(resPerPage)
//         .skip(skip);

//     res.status(200).json({
//         success: true,
//         count: productsCount,
//         products,
//         resPerPage,
//         currentPage
//     });
// });


// // Create Product
// exports.newProduct = catchAsyncError(async (req, res, next) => {
//     let images = [];
//     let BASE_URL = process.env.BACKEND_URL;
//     if (process.env.NODE_ENV === "production") {
//         BASE_URL = `${req.protocol}://${req.get('host')}`;
//     }

//     if (req.files.length > 0) {
//         req.files.forEach(file => {
//             let url = `${BASE_URL}/uploads/product/${file.originalname}`;
//             images.push({ image: url });
//         });
//     }

//     req.body.images = images;
//     req.body.user = req.user.id;

//     const product = await Product.create(req.body);

//     res.status(201).json({
//         success: true,
//         product
//     });
// });

// // Get Single Product
// exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
//     const product = await Product.findById(req.params.id).populate('reviews.user', 'name email');

//     if (!product) {
//         return next(new ErrorHandler('Product not found', 400));
//     }

//     res.status(200).json({
//         success: true,
//         product
//     });
// });

// // Update Product
// exports.updateProduct = catchAsyncError(async (req, res, next) => {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//         return res.status(404).json({
//             success: false,
//             message: "Product not found"
//         });
//     }

//     let images = [];
//     if (req.body.imagesCleared === 'false') {
//         images = product.images;
//     }

//     let BASE_URL = process.env.BACKEND_URL;
//     if (process.env.NODE_ENV === "production") {
//         BASE_URL = `${req.protocol}://${req.get('host')}`;
//     }

//     if (req.files.length > 0) {
//         req.files.forEach(file => {
//             let url = `${BASE_URL}/uploads/product/${file.originalname}`;
//             images.push({ image: url });
//         });
//     }

//     req.body.images = images;

//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });

//     res.status(200).json({
//         success: true,
//         product
//     });
// });

// // Delete Product
// exports.deleteProduct = catchAsyncError(async (req, res, next) => {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//         return res.status(404).json({
//             success: false,
//             message: "Product not found"
//         });
//     }

//     await product.remove();

//     res.status(200).json({
//         success: true,
//         message: "Product Deleted!"
//     });
// });

// // Create Review
// exports.createReview = catchAsyncError(async (req, res, next) => {
//     const { productId, rating, comment } = req.body;

//     const review = {
//         user: req.user.id,
//         rating,
//         comment
//     };

//     const product = await Product.findById(productId);
//     const isReviewed = product.reviews.find(
//         review => review.user.toString() === req.user.id.toString()
//     );

//     if (isReviewed) {
//         product.reviews.forEach(review => {
//             if (review.user.toString() === req.user.id.toString()) {
//                 review.comment = comment;
//                 review.rating = rating;
//             }
//         });
//     } else {
//         product.reviews.push(review);
//         product.numOfReviews = product.reviews.length;
//     }

//     product.ratings = product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.reviews.length;
//     product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

//     await product.save({ validateBeforeSave: false });

//     res.status(200).json({
//         success: true
//     });
// });

// // Get Reviews
// exports.getReviews = catchAsyncError(async (req, res, next) => {
//     const product = await Product.findById(req.query.id).populate('reviews.user', 'name email');

//     if (!product) {
//         return res.status(404).json({
//             success: false,
//             message: "Product not found"
//         });
//     }

//     res.status(200).json({
//         success: true,
//         reviews: product.reviews
//     });
// });

// // Delete Review
// exports.deleteReview = catchAsyncError(async (req, res, next) => {
//     const product = await Product.findById(req.query.productId);

//     if (!product) {
//         return res.status(404).json({
//             success: false,
//             message: "Product not found"
//         });
//     }

//     const reviews = product.reviews.filter(
//         review => review._id.toString() !== req.query.id.toString()
//     );

//     const numOfReviews = reviews.length;
//     let ratings = reviews.reduce((acc, review) => review.rating + acc, 0) / reviews.length;
//     ratings = isNaN(ratings) ? 0 : ratings;

//     await Product.findByIdAndUpdate(req.query.productId, {
//         reviews,
//         numOfReviews,
//         ratings
//     });

//     res.status(200).json({
//         success: true
//     });
// });

// // Get Admin Products
// exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
//     const products = await Product.find();
//     res.status(200).send({
//         success: true,
//         products
//     });
// });

// // Get Products by Category
// exports.getProductsByCategory = async (req, res) => {
//     try {
//         const keyword = req.params.keyword;

//         const products = await Product.find({
//             category: {
//                 $regex: new RegExp(`^${keyword}$`, 'i')
//             }
//         });

//         res.status(200).json({
//             success: true,
//             results: products.length,
//             products
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// };
