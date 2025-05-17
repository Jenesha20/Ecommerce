// import { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProducts } from "../../actions/productActions";
// import Loader from ".././layouts/Loader";
// import MetaData from ".././layouts/MetaData";
// import Product from ".././product/Product";
// import  {toast} from 'react-toastify';
// import Pagination from 'react-js-pagination';
// import { useParams } from "react-router-dom";
// import Slider from "rc-slider";
// import Tooltip from 'rc-tooltip';
// import 'rc-slider/assets/index.css';
// import 'rc-tooltip/assets/bootstrap.css';

// export  default function ProductSearch(){
//     const dispatch = useDispatch();
//     const {products, loading, error, productsCount, resPerPage} =    useSelector((state) => state.productsState)
//     const [currentPage, setCurrentPage] = useState(1);
//     const [price, setPrice] = useState([1,1000]);
//     const [priceChanged, setPriceChanged] = useState(price);
//     const [category, setCategory] = useState(null);
//     const [rating, setRating] = useState(0);

//     const { keyword } = useParams();
//     // const categories = [  
//     //     'Electronics',
//     //     'Mobile Phones',
//     //     'Laptops',
//     //     'Accessories',
//     //     'Headphones',
//     //     'Food',
//     //     'Books',
//     //     'Clothes/Shoes',
//     //     'Beauty/Health',
//     //     'Sports',
//     //     'Outdoor',
//     //     'Home'
//     // ];
//     const categories = [
//         'Electronics',
//         'Sanitary wares',
//         'Accessories'
//     ];
 
//     const setCurrentPageNo = (pageNo) =>{

//         setCurrentPage(pageNo)
       
//     }

//     useEffect(()=>{
//         if(error) {
//             return toast.error(error,{
//                 position: toast.POSITION.BOTTOM_CENTER
//             })
//         }
//         dispatch(getProducts(keyword, priceChanged, category, rating, currentPage)) 
//     }, [error, dispatch, currentPage, keyword, priceChanged, category, rating])

//     const [selectedCategory, setSelectedCategory] = useState(null);
//     return (
//         <Fragment>
//             {loading ? <Loader/>:
//                 <Fragment>
//                     <MetaData title={'Buy Best Products'} />
//                     <h1 id="products_heading">Search Products</h1>
//                     <section id="products" className="container mt-5">
//                         <div className="row">
//                             <div className="col-6 col-md-3 mb-5 mt-5">
//                                 {/* Price Filter */}
//                                 <div className="px-5" onMouseUp={()=>setPriceChanged(price)}>
//                                     <Slider
//                                         range={true}
//                                         marks = {
//                                              {
//                                                 1: "1",
//                                                 1000: "100000"
//                                              }   
//                                         }
//                                         min={1}
//                                         max={1000}
//                                         defaultValue={price}
//                                         onChange={(price)=>{
//                                             setPrice(price)
//                                         }}
//                                         handleRender={
//                                             renderProps => {
//                                                 return (
//                                                     <Tooltip  overlay={`Rs{renderProps.props['aria-valuenow']}`}  >
//                                                          <div {...renderProps.props}>  </div>
//                                                     </Tooltip>
//                                                 )
//                                             }
//                                         }
//                                     />
//                                 </div>
//                                 <hr className="my-5" />        
//                                 {/* Category Filter */}
//                                 <div className="mt-5">
//                                      <h3 className="mb-3">Categories</h3> 
//                                        <ul className="pl-0">
//                                         {categories.map(category =>
//                                              <li
//                                              style={{
//                                                  cursor:"pointer",
//                                                  listStyleType: "none"
//                                              }}
//                                              key={category}
//                                              onClick={()=>{
//                                                 setCategory(category)
//                                              }}
//                                              >
//                                                  {category}
//                                              </li>
                                            
//                                             )}
                                           
//                                        </ul>
//                                 </div>
//                                 <hr className="my-5" /> 
//                                 {/* Ratings Filter */}
//                                 <div className="mt-5">
//     <h3 className="mb-3">Categories</h3> 
//     <ul className="pl-0">
//         {categories.map(category =>
//             <li
//                 style={{
//                     cursor: "pointer",
//                     listStyleType: "none",
//                     fontWeight: selectedCategory === category ? 'bold' : 'normal'
//                 }}
//                 key={category}
//                 onClick={() => {
//                     const newCategory = selectedCategory === category ? null : category;
//                     setSelectedCategory(newCategory);
//                     setCategory(newCategory);
//                     setCurrentPage(1);
//                 }}
//             >
//                 {category}
//                 {selectedCategory === category && <span> ✓</span>}
//             </li>
//         )}
//     </ul>
// </div>
//                             </div>
//                             <div className="col-6 col-md-9">
//                                 <div className="row">
//                                     { products && products.map(product => (
//                                         <Product col={4} key={product._id}  product={product}/>
//                                     ))}
//                                 </div>

//                             </div>
//                         </div>
//                     </section>
//                     {productsCount > 0 && productsCount > resPerPage?
//                     <div className="d-flex justify-content-center mt-5">
//                            <Pagination 
//                                 activePage={currentPage}
//                                 onChange={setCurrentPageNo}
//                                 totalItemsCount={productsCount}
//                                 itemsCountPerPage={resPerPage}
//                                 nextPageText={'Next'}
//                                 firstPageText={'First'}
//                                 lastPageText={'Last'}
//                                 itemClass={'page-item'}
//                                 linkClass={'page-link'}
//                            />     
//                     </div> : null }
//                 </Fragment>
//            }
//         </Fragment>
//     )
// }



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Product from "../product/Product";
import Loader from "../layouts/Loader";
import Pagination from 'react-js-pagination';
import { useSearchParams, useParams } from 'react-router-dom';
export default function ProductSearch() {
    const dispatch = useDispatch();
    const { products, loading, productsCount, resPerPage } = useSelector(state => state.productsState);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchParams] = useSearchParams();
    const params = useParams();
    
    // Get keyword from either path or query params
    const keyword = params.keyword || searchParams.get('keyword') || '';
    
    // Get category from either path or query params
    const category = params.categoryName || searchParams.get('category') || '';
    const categories = ['Electronics', 'Sanitary wares', 'Accessories'];

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo);
    };

    useEffect(() => {
        dispatch(getProducts(null, null, selectedCategory, null, currentPage));
    }, [dispatch, currentPage, selectedCategory]);

    return (
        <div className="container mt-5">
            {loading ? <Loader /> : (
                <div className="row">
                    {/* Category Filter Sidebar */}
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h5>Categories</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    {categories.map(category => (
                                        <li 
                                            key={category}
                                            className={`list-group-item ${selectedCategory === category ? 'active' : ''}`}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setSelectedCategory(selectedCategory === category ? null : category);
                                                setCurrentPage(1);
                                            }}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Products List */}
                    <div className="col-md-9">
                        <div className="row">
                            {products && products.length > 0 ? (
                                products.map(product => (
                                    <div className="col-md-4 mb-4" key={product._id}>
                                        <Product product={product} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <div className="alert alert-info">
                                        No products found in this category
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {productsCount > resPerPage && (
                            <div className="d-flex justify-content-center mt-4">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    pageRangeDisplayed={5}
                                    onChange={setCurrentPageNo}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}




// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useSearchParams } from 'react-router-dom';
// import { getProducts } from '../../actions/productActions';
// import Product from '../product/Product';
// import Loader from '../layouts/Loader';
// import Pagination from 'react-js-pagination';
// import Slider from 'rc-slider';
// import Tooltip from 'rc-tooltip';
// import 'rc-slider/assets/index.css';
// import 'rc-tooltip/assets/bootstrap.css';
// import { toast } from 'react-toastify';

// const ProductSearch = () => {
//     const dispatch = useDispatch();
//     const [searchParams] = useSearchParams();
//     const { products, loading, error, productsCount, resPerPage } = useSelector(state => state.productsState);
    
//     const [currentPage, setCurrentPage] = useState(1);
//     const [priceRange, setPriceRange] = useState([1, 10000]);  // Increased max price
// const [appliedPriceRange, setAppliedPriceRange] = useState([1, 10000]);
//     const [category, setCategory] = useState('');
//     const [rating, setRating] = useState(0);

//     const categories = [
//         // 'Electronics',
//         // 'Mobile Phones',
//         // 'Laptops',
//         // 'Accessories',
//         // 'Headphones',
//         // 'Food',
//         // 'Books',
//         // 'Clothes/Shoes',
//         // 'Beauty/Health',
//         // 'Sports',
//         // 'Outdoor',
//         // 'Home'
//         'Electronics',
//         'Sanitary wares',
//         'Accessories'
//     ];

//     useEffect(() => {
//         if (error) {
//             return toast.error(error, {
//                 position: toast.POSITION.BOTTOM_CENTER
//             });
//         }
    
//         const keyword = searchParams.get('keyword') || '';
//         const urlCategory = searchParams.get('category') || category;
        
//         dispatch(getProducts(
//             keyword,
//             appliedPriceRange.join(','),
//             urlCategory,
//             rating,
//             currentPage
//         ));
//     }, [dispatch, currentPage, searchParams, appliedPriceRange, rating, category, error]);
    

//     const setCurrentPageNo = (pageNo) => {
//         setCurrentPage(pageNo);
//     };

//     const applyPriceFilter = () => {
//         setAppliedPriceRange(priceRange);
//         setCurrentPage(1);
//     };

//     const handleCategoryChange = (selectedCategory) => {
//         setCategory(selectedCategory === category ? '' : selectedCategory);
//         setCurrentPage(1);
//     };

//     const handleRatingChange = (selectedRating) => {
//         setRating(selectedRating === rating ? 0 : selectedRating);
//         setCurrentPage(1);
//     };

//     if (loading) return <Loader />;

//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 {/* Filters Column */}
//                 <div className="col-md-3 mb-4">
//                     <div className="card">
//                         <div className="card-header bg-primary text-white">
//                             <h5 className="mb-0">Filters</h5>
//                         </div>
//                         <div className="card-body">
//                             {/* Price Filter */}
//                             <div className="mb-4">
//                                 <h6>Price Range</h6>
//                                 <div className="px-3">
//                                     <Slider
//                                         range
//                                         min={1}
//                                         max={1000}
//                                         value={priceRange}
//                                         onChange={setPriceRange}
//                                         onAfterChange={applyPriceFilter}
//                                         handleRender={renderProps => (
//                                             <Tooltip overlay={`${renderProps.props['aria-valuenow']}`}>
//                                                 <div {...renderProps.props}></div>
//                                             </Tooltip>
//                                         )}
//                                     />
//                                 </div>
//                                 <div className="d-flex justify-content-between mt-2">
//                                     <span>${priceRange[0]}</span>
//                                     <span>${priceRange[1]}</span>
//                                 </div>
//                             </div>
                            
//                             {/* Category Filter */}
//                             <div className="mb-4">
//                                 <h6>Categories</h6>
//                                 <div className="list-group">
//                                     {categories.map((cat) => (
//                                         <button
//                                             key={cat}
//                                             className={`list-group-item list-group-item-action text-start ${category === cat ? 'active' : ''}`}

//                                             onClick={() => handleCategoryChange(cat)}
//                                         >
//                                             {cat}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
                            
//                             {/* Rating Filter */}
//                             <div className="mb-4">
//                                 <h6>Minimum Rating</h6>
//                                 <div className="btn-group d-flex flex-wrap">
//                                     {[5, 4, 3, 2, 1].map((star) => (
//                                         <button
//                                             key={star}
//                                             className={`btn btn-sm ${rating === star ? 'btn-primary' : 'btn-outline-primary'}`}
//                                             onClick={() => handleRatingChange(star)}
//                                             style={{ minWidth: '40px', margin: '2px' }}
//                                         >
//                                             {star} ★
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//                 {/* Products Column */}
//                 <div className="col-md-9">
//                     <div className="row">
//                         {products && products.length > 0 ? (
//                             products.map(product => (
//                                 <div className="col-md-4 mb-4" key={product._id}>
//                                     <Product product={product} col={12} />
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="col-12">
//                                 <div className="alert alert-info text-center">
//                                     No products found matching your criteria.
//                                 </div>
//                             </div>
//                         )}
//                     </div>
                    
//                     {/* Pagination */}
//                     {productsCount > resPerPage && (
//                         <div className="d-flex justify-content-center mt-4">
//                             <Pagination
//                                 activePage={currentPage}
//                                 itemsCountPerPage={resPerPage}
//                                 totalItemsCount={productsCount}
//                                 pageRangeDisplayed={5}
//                                 onChange={setCurrentPageNo}
//                                 itemClass="page-item"
//                                 linkClass="page-link"
//                                 firstPageText="First"
//                                 lastPageText="Last"
//                             />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductSearch;