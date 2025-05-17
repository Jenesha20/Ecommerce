import { Link } from 'react-router-dom';

// export default function Product ({product, col}) {
//     return (
//         <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
//             <div className="card p-3 rounded">
//                 {product.images.length > 0 &&
//                 <img
//                 className="card-img-top mx-auto"
//                 src={product.images[0].image}
//                 alt={product.name}
//                 />}
//                 <div className="card-body d-flex flex-column">
//                 <h5 className="card-title">
//                     <Link to={`/product/${product._id}`}>{product.name}</Link>
//                 </h5>
//                 <div className="ratings mt-auto">
//                     <div className="rating-outer">
//                     <div className="rating-inner" style={{width: `${product.ratings/ 5 * 100}%` }}></div>
//                     </div>
//                     <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
//                 </div>
//                 <p className="card-text">Rs{product.price}</p>
//                 <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
//                 </div>
//             </div>
//         </div>
//     )
// }


export default function Product({ product }) {
    return (
        <div className="card h-100">
            {product.images.length > 0 && (
                <img
                    className="card-img-top img-fluid"
                    src={product.images[0].image}
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'contain' }}
                />
            )}
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h5>
                <div className="ratings mt-auto mb-2">
                    <div className="rating-outer">
                        <div 
                            className="rating-inner" 
                            style={{ width: `${(product.ratings/5)*100}%` }}
                        ></div>
                    </div>
                    <span>({product.numOfReviews} reviews)</span>
                </div>
                <p className="card-text">Rs{product.price}</p>
                <Link 
                    to={`/product/${product._id}`} 
                    className="btn btn-primary mt-auto"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}