const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name : {
//         type: String,
//         required: [true, "Please enter product name"],
//         trim: true,
//         maxLength: [1000, "Product name cannot exceed 100 characters"]
//     },
//     price: {
//         type: Number,
//         required: true,
//         default: 0.0
//     },
//     description: {
//         type: String,
//         required: [true, "Please enter product description"]
//     },
//     ratings: {
//         type: String,
//         default: 0
//     },
//     images: [
//         {
//             image: {
//                 type: String,
//                 required: true
//             }
//         }
//     ],
//     category: {
//         type: String,
//         required: [true, "Please enter product category"],
//         enum: {
//             values: [
//                 'Electronics',
//                 'Sanitary wares',
//                 'Accessories'
//             ],
//             message : "Please select correct category"
//         }
//     },
//     seller: {
//         type: String,
//         required: [true, "Please enter product seller"]
//     },
//     stock: {
//         type: Number,
//         required: [true, "Please enter product stock"],
//         maxLength: [20, 'Product stock cannot exceed 20']
//     },
//     numOfReviews: {
//         type: Number,
//         default: 0
//     },
//     reviews: [
//         {
//             user:{
//                 type:mongoose.Schema.Types.ObjectId,
//                 ref: 'User'
//             },
//             rating: {
//                 type: String,
//                 required: true
//             },
//             comment: {
//                 type: String,
//                 required: true
//             }
//         }
//     ],
//     user: {
//         type : mongoose.Schema.Types.ObjectId
//     }
//     ,
//     createdAt:{
//         type: Date,
//         default: Date.now()
//     }
// })

// let schema = mongoose.model('Product', productSchema)

// module.exports = schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [1000, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type: Number,  // Changed from String to Number
        default: 0
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: [
                'Electronics',
                'Sanitary wares',
                'Accessories'
            ],
            message: "Please select correct category"
        }
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        max: [10000, 'Product stock cannot exceed 10000']  // Changed to `max`
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,  // Changed from String to Number
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Added reference
    },
    createdAt: {
        type: Date,
        default: Date.now  // Removed parentheses
    }
});

module.exports = mongoose.model('Product', productSchema);