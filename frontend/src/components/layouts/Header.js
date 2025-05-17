// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Search from './Search';
// import {useDispatch, useSelector} from 'react-redux';
// import {DropdownButton, Dropdown, Image} from 'react-bootstrap';
// import { logout } from '../../actions/userActions';


// export default function Header () {
//     const { isAuthenticated, user } = useSelector(state => state.authState);
//     const { items:cartItems } = useSelector(state => state.cartState)
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const logoutHandler = () => {
//       dispatch(logout);
//     }


//     return (
//     <nav className="navbar row">
//         <div className="col-12 col-md-3">
//           <div className="navbar-brand">
//             <Link to="/">
//               {/* <img width="70px" alt='JVLcart Logo' src="/images/images.png" /> */}
//             </Link>
//             </div>
//         </div>
  
//         <div className="col-12 col-md-6 mt-2 mt-md-0">
//            <Search/>
//         </div>
  
//         <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
//           { isAuthenticated ? 
//             (
//               <Dropdown className='d-inline' >
//                   <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
//                     <figure className='avatar avatar-nav'>
//                       <Image width="50px" src={user.avatar??'./images/default_avatar.png'}  />
//                     </figure>
//                     <span>{user.name}</span>
//                   </Dropdown.Toggle>
//                   <Dropdown.Menu>
//                       { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
//                       <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
//                       <Dropdown.Item onClick={() => {navigate('/orders')}} className='text-dark'>Orders</Dropdown.Item>
//                       <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
//                   </Dropdown.Menu>
//               </Dropdown>
//             )
          
//           :
//             <Link to="/login"  className="btn" id="login_btn">Login</Link>
//           }
          // {/* <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link> */}
          // {/* <span className="ml-1" id="cart_count">{cartItems.length}</span> */}
//         </div>
//     </nav>
//     )
// }



// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import Search from './Search';
// import { useDispatch, useSelector } from 'react-redux';
// import { Dropdown, Image } from 'react-bootstrap';
// import { logout } from '../../actions/userActions';

// export default function Header() {
//   const { isAuthenticated, user } = useSelector(state => state.authState);
//   const { items: cartItems } = useSelector(state => state.cartState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isLandingPage = location.pathname === '/';
//   const isAdminRoute = location.pathname.startsWith('/admin');

//   const logoutHandler = () => {
//     dispatch(logout);
//   };

//   return (
//     <nav className="navbar row">
//       {/* Left: Store Name */}
//       <div className="col-12 col-md-3 text-center text-md-left">
//         <div className="navbar-brand">
//           <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
//             <h4 className="mb-0">Suresh Hardwares and Plumbings</h4>
//           </Link>
//         </div>
//       </div>

//       {/* Center: Search */}
//       <div className="col-12 col-md-6 mt-2 mt-md-0">
//         {!isAdminRoute && <Search />}
//       </div>

//       {/* Right: User Dropdown/Login + Cart */}
//       <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
//         {isAuthenticated ? (
//           <>
//             <Dropdown className="d-inline">
//               <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
//                 <figure className="avatar avatar-nav">
//                   <Image
//                     width="50px"
//                     src={user.avatar ?? './images/default_avatar.png'}
//                     alt="avatar"
//                   />
//                 </figure>
//                 <span>{user.name}</span>
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 {user.role === 'admin' && (
//                   <Dropdown.Item
//                     onClick={() => navigate('/admin/dashboard')}
//                     className="text-dark"
//                   >
//                     Dashboard
//                   </Dropdown.Item>
//                 )}
//                 <Dropdown.Item onClick={() => navigate('/myprofile')} className="text-dark">
//                   Profile
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => navigate('/orders')} className="text-dark">
//                   Orders
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={logoutHandler} className="text-danger">
//                   Logout
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>

//             {/* Cart - only if user is logged in and not on landing page */}
//             {!isLandingPage && (
//               <>
//                 <Link to="/cart">
//                   <span id="cart" className="ml-3">Cart</span>
//                 </Link>
//                 <span className="ml-1" id="cart_count">{cartItems.length}</span>
//               </>
//             )}
//           </>
//         ) : (
//           <Link to="/login" className="btn" id="login_btn">
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }




// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import Search from './Search';
// import { useDispatch, useSelector } from 'react-redux';
// import { Dropdown, Image } from 'react-bootstrap';
// import { logout } from '../../actions/userActions';

// export default function Header() {
//   const { isAuthenticated, user } = useSelector(state => state.authState);
//   const { items: cartItems } = useSelector(state => state.cartState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Check if the current route is the landing page ('/')
//   const isLandingPage = location.pathname === '/';
  
//   // Check if the current route is an admin route
//   const isAdminRoute = location.pathname.startsWith('/admin');

//   const logoutHandler = () => {
//     dispatch(logout);
//   }

//   // Return null for the landing page to hide the header
//   if (isLandingPage) return null;

//   return (
//     <nav className="navbar row">
//       <div className="col-12 col-md-3">
//         <div className="navbar-brand">
//           <Link to="/">
//             {/* <img width="70px" alt='JVLcart Logo' src="/images/images.png" /> */}
//           </Link>
//         </div>
//       </div>

//       <div className="col-12 col-md-6 mt-2 mt-md-0">
//         {
//           isAdminRoute 
//             ? (
//                 <div className="d-flex justify-content-center align-items-center h-100">
//                   <h4 className="text-white mb-0">Suresh Hardwares and Plumbings</h4>
//                 </div>
//               )
//             : <Search />
//         }
//       </div>

//       <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
//         {isAuthenticated ? (
//           <Dropdown className='d-inline'>
//             <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
//               <figure className='avatar avatar-nav'>
//                 <Image width="50px" src={user.avatar ?? './images/default_avatar.png'} />
//               </figure>
//               <span>{user.name}</span>
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               {user.role === 'admin' && (
//                 <Dropdown.Item onClick={() => navigate('/admin/dashboard')} className='text-dark'>
//                   Dashboard
//                 </Dropdown.Item>
//               )}
//               <Dropdown.Item onClick={() => navigate('/myprofile')} className='text-dark'>Profile</Dropdown.Item>
//               <Dropdown.Item onClick={() => navigate('/orders')} className='text-dark'>Orders</Dropdown.Item>
//               <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         ) : (
//           <Link to="/login" className="btn" id="login_btn">Login</Link>
//         )}

//         <Link to="/cart">
//           <span id="cart" className="ml-3">Cart</span>
//         </Link>
//         <span className="ml-1" id="cart_count">{cartItems.length}</span>
//       </div>
//     </nav>
//   );
// }


// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import Search from './Search';
// import { useDispatch, useSelector } from 'react-redux';
// import { Dropdown, Image } from 'react-bootstrap';
// import { logout } from '../../actions/userActions';

// export default function Header() {
//   const { isAuthenticated, user } = useSelector(state => state.authState);
//   const { items: cartItems } = useSelector(state => state.cartState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isLandingPage = location.pathname === '/';
//   const isAdminRoute = location.pathname.startsWith('/admin');
//   const isAdminUser = user?.role === 'admin';

//   const logoutHandler = () => {
//     dispatch(logout);
//   };

//   return (
//     <nav className="navbar row">
//       {/* Left: Store Name */}
//       <div className="col-12 col-md-3 text-center text-md-left">
//         <div className="navbar-brand">
//           <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
//             <h4 className="mb-0">Suresh Hardwares and Plumbings</h4>
//           </Link>
//         </div>
//       </div>

//       {/* Center: Search */}
//       <div className="col-12 col-md-6 mt-2 mt-md-0">
//         {!isAdminRoute && <Search />}
//       </div>

//       {/* Right: User Dropdown/Login + Cart */}
//       <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
//         {isAuthenticated ? (
//           <>
//             <Dropdown className="d-inline">
//               <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
//                 <figure className="avatar avatar-nav">
//                   <Image
//                     width="50px"
//                     src={user.avatar ?? './images/default_avatar.png'}
//                     alt="avatar"
//                   />
//                 </figure>
//                 <span>{user.name}</span>
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 {isAdminUser && (
//                   <Dropdown.Item
//                     onClick={() => navigate('/admin/dashboard')}
//                     className="text-dark"
//                   >
//                     Dashboard
//                   </Dropdown.Item>
//                 )}
//                 <Dropdown.Item onClick={() => navigate('/myprofile')} className="text-dark">
//                   Profile
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => navigate('/orders')} className="text-dark">
//                   Orders
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={logoutHandler} className="text-danger">
//                   Logout
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>

//             {/* Cart - only if user is logged in, not on landing page, and not an admin */}
//             {!isLandingPage && !isAdminUser && (
//               <>
//                 <Link to="/cart">
//                   <span id="cart" className="ml-3">Cart</span>
//                 </Link>
//                 <span className="ml-1" id="cart_count">{cartItems.length}</span>
//               </>
//             )}
//           </>
//         ) : (
//           <Link to="/login" className="btn" id="login_btn">
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';

export default function Header() {
  const { isAuthenticated, user } = useSelector(state => state.authState);
  const { items: cartItems } = useSelector(state => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';
  const isLoginOrRegister = ['/login', '/register'].includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHiddenSearch = isLoginOrRegister || isAdminRoute;
  const isAdminUser = user?.role === 'admin';

  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <nav className="navbar row">
      {/* Left: Store Name */}
      <div className="col-12 col-md-3 text-center text-md-left">
        <div className="navbar-brand">
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            <h4 className="mb-0">Suresh Hardwares and Plumbings</h4>
          </Link>
        </div>
      </div>

      {/* Center: Search */}
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        {!isHiddenSearch && <Search />}
      </div>

      {/* Right: User Dropdown/Login + Cart */}
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ? (
          <>
            <Dropdown className="d-inline">
              <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
                <figure className="avatar avatar-nav">
                  <Image
                    width="50px"
                    src={user.avatar ?? './images/default_avatar.png'}
                    alt="avatar"
                  />
                </figure>
                <span>{user.name}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {isAdminUser && (
                  <Dropdown.Item
                    onClick={() => navigate('/admin/dashboard')}
                    className="text-dark"
                  >
                    Dashboard
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={() => navigate('/myprofile')} className="text-dark">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/orders')} className="text-dark">
                  Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler} className="text-danger">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {!isLandingPage && !isAdminUser && (
              <>
                <Link to="/cart">
                  <span id="cart" className="ml-3">Cart</span>
                </Link>
                <span className="ml-1" id="cart_count">{cartItems.length}</span>
              </>
            )}
          </>
        ) : (
          !isLoginOrRegister && (
            <Link to="/login" className="btn" id="login_btn">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

