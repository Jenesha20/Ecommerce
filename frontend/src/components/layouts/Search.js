// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom'

// export default function Search () {

//     const navigate = useNavigate();
//     const location = useLocation();
//     const [keyword, setKeyword] = useState("")

//     const searchHandler = (e) => {
//         e.preventDefault();
//         navigate(`/search/${keyword}`)

//     }

//     const clearKeyword = () =>{
//         setKeyword("");
//     }

//     useEffect(() => {
//         if(location.pathname === '/') {
//             clearKeyword();
//         }
//     },[location])

//     return (
//         <form onSubmit={searchHandler}>
//             <div className="input-group">
//                 <input
//                 type="text"
//                 id="search_field"
//                 className="form-control"
//                 placeholder="Enter Product Name ..."
//                 onChange={(e)=>{ setKeyword(e.target.value) }}
//                 value={keyword}
//                 />
//                 <div className="input-group-append">
//                 <button id="search_btn" className="btn">
//                     <i className="fa fa-search" aria-hidden="true"></i>
//                 </button>
//                 </div>
//             </div>
//         </form>
//     )
// }

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Search = () => {
//     const navigate = useNavigate();
//     const [keyword, setKeyword] = useState('');
//     const [category, setCategory] = useState('');

//     const searchHandler = (e) => {
//         e.preventDefault();
//         const trimmedKeyword = keyword.trim();
        
//         if (trimmedKeyword || category) {
//             let searchPath = '/products';
//             const params = new URLSearchParams();
            
//             if (trimmedKeyword) params.append('keyword', trimmedKeyword);
//             if (category) params.append('category', category);
            
//             navigate(`${searchPath}?${params.toString()}`);

//         }
//     };

//     const clearSearch = () => {
//         setKeyword('');
//         setCategory('');
//         navigate('/products');
//     };

//     return (
//         <form onSubmit={searchHandler} className="d-flex">
//             <div className="input-group">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search products..."
//                     value={keyword}
//                     onChange={(e) => setKeyword(e.target.value)}
//                 />
                
//                 <select
//                     className="form-select"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                 >
//                     <option value="">All Categories</option>
//                     <option value="Electronics">Electronics</option>
//                     <option value="Accessories">Accessories</option>
//                     <option value="Sanitary wares">Sanitary wares</option>
//                 </select>
                
//                 <button className="btn btn-primary" type="submit">
//                     <i className="fa fa-search"></i>
//                 </button>
                
//                 {(keyword || category) && (
//                     <button 
//                         className="btn btn-outline-secondary" 
//                         type="button"
//                         onClick={clearSearch}
//                     >
//                         <i className="fa fa-times"></i>
//                     </button>
//                 )}
//             </div>
//         </form>
//     );
// };

// export default Search;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Search = () => {
//     const navigate = useNavigate();
//     const [keyword, setKeyword] = useState('');
//     const [category, setCategory] = useState('');

//     const searchHandler = (e) => {
//         e.preventDefault();
//         const trimmedKeyword = keyword.trim();
        
//         if (category) {
//             // Use path parameter for category
//             if (trimmedKeyword) {
//                 navigate(`/products/search/${trimmedKeyword}/category/${category}`);
//             } else {
//                 navigate(`/products/category/${category}`);
//             }
//         } else if (trimmedKeyword) {
//             navigate(`/products/search/${trimmedKeyword}`);
//         } else {
//             navigate('/products');
//         }
//     };

//     const clearSearch = () => {
//         setKeyword('');
//         setCategory('');
//         navigate('/products');
//     };

//     return (
//         <form onSubmit={searchHandler} className="d-flex">
//             <div className="input-group">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search products..."
//                     value={keyword}
//                     onChange={(e) => setKeyword(e.target.value)}
//                 />
                
//                 <select
//                     className="form-select"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                 >
//                     <option value="">All Categories</option>
//                     <option value="Electronics">Electronics</option>
//                     <option value="Sanitary wares">Sanitary wares</option>
//                     <option value="Accessories">Accessories</option>
//                 </select>
                
//                 <button className="btn btn-primary" type="submit">
//                     <i className="fa fa-search"></i>
//                 </button>
                
//                 {(keyword || category) && (
//                     <button 
//                         className="btn btn-outline-secondary" 
//                         type="button"
//                         onClick={clearSearch}
//                     >
//                         <i className="fa fa-times"></i>
//                     </button>
//                 )}
//             </div>
//         </form>
//     );
// };

// export default Search;


import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState("");
    const [searchPerformed, setSearchPerformed] = useState(false);

    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword.trim()}`);
            setSearchPerformed(true);
        }
    };

    const clearKeyword = () => {
        setKeyword("");
        if (searchPerformed) {
            navigate("/");
            setSearchPerformed(false);
        }
    };

    useEffect(() => {
        if (location.pathname === '/') {
            clearKeyword();
        }
    }, [location]);

    return (
        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                />
                <div className="input-group-append">
                    <button 
                        id="search_btn" 
                        className="btn"
                        type="submit"
                    >
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                    {keyword && (
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={clearKeyword}
                        >
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}