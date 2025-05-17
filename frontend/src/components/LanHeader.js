// import { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';
// import { FaChevronDown, FaSearch } from 'react-icons/fa';
// import Navigation from './Navigation';  // Ensure correct path
// import { Link, useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../hooks/redux_selectors';
// import useCustomRef from '../hooks/useCustomRef';
// import { logout } from '../slices/authSlice';
// import { emptyCart, loadCart } from '../slices/cartSlice';
// import * as BreakPoints from '../Responsive';
// import { ToastContainer, toast } from 'react-toastify';
// import { resetNotification } from '../slices/authSlice';
// import { resetCartNotification } from '../slices/cartSlice';

// const LanHeader = () => {
//   const user = useAppSelector(state => state.Auth.user);
//   const [show, setShow] = useState(false);
//   const [searchParam, setSearchParam] = useState('');

//   const menuRef = useRef(null);
//   const dispatch = useAppDispatch();
//   const Navigate = useNavigate();

//   useEffect(() => {
//     if (user.name) {
//       dispatch(loadCart(user._id));
//     }
//   }, [user, dispatch]);

//   useCustomRef(menuRef, () => {
//     setShow(false);
//   });

//   const handleLogout = () => {
//     dispatch(logout());
//     dispatch(emptyCart());
//     setShow(false);
//   };

//   const handleClick = () => {
//     Navigate(`/search/${searchParam}`, { replace: true });
//     setSearchParam('');
//   };

//   // Notification Logic
//   const { toastConfig, showNotification } = useAppSelector(state => state.Auth);
//   const { cart, toastConfig: CartToastConfig, notification } = useAppSelector(state => state.Cart);

//   // login and signup toast
//   useEffect(() => {
//     if (!showNotification) return;

//     toast(toastConfig.message, {
//       position: "top-center",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: false,
//       draggable: false,
//       type: toastConfig.color,
//       progress: undefined,
//       theme: "light",
//     });

//     const timeout = setTimeout(() => {
//       dispatch(resetNotification());
//     }, 2000);

//     return () => {
//       dispatch(resetNotification());
//       toast.dismiss();
//       clearTimeout(timeout);
//     };
//   }, [showNotification, toastConfig, dispatch]);

//   // cart toast notification
//   useEffect(() => {
//     if (!CartToastConfig.message || !notification) return;

//     toast(CartToastConfig.message, {
//       position: "top-center",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: false,
//       draggable: false,
//       type: CartToastConfig.color,
//       progress: undefined,
//       theme: "light",
//     });

//     const interval = setInterval(() => {
//       dispatch(resetCartNotification());
//     }, 2000);

//     return () => {
//       dispatch(resetCartNotification());
//       clearInterval(interval);
//       toast.dismiss();
//     };
//   }, [cart, notification, CartToastConfig, dispatch]);

//   return (
//     <Container>
//       {/* First header section */}
//       <FirstHeaderSection>
//         <Left>
//           <TitleHeader><Link to="/">Suresh Hardware and Plumbing</Link></TitleHeader>
//         </Left>
//         <Right>
//           <HeaderPara>Language : EN</HeaderPara>
//           {user.name && <HeaderButton onClick={() => setShow(!show)}>My Account <FaChevronDown /></HeaderButton>}
//           {show && (
//             <Menu ref={menuRef}>
//               <Link to="/order">Orders</Link>
//               <button onClick={handleLogout}>Logout</button>
//             </Menu>
//           )}
//         </Right>
//       </FirstHeaderSection>

//       {/* Third header section */}
//       <ThirdHeaderSection>
//         <SearchContainer data-aos="fade-right" data-aos-duration="1500">
//           <Search placeholder="Search" value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
//           <SearchButton onClick={handleClick}><FaSearch /></SearchButton>
//         </SearchContainer>
//         <Navigation />
//       </ThirdHeaderSection>

//       {/* Notification Toast */}
//       <ToastContainer style={{ fontFamily: 'Poppins' }} />

//     </Container>
//   );
// };

// export default LanHeader;

// // Styled Components Below

// const Container = styled.div``;

// const FirstHeaderSection = styled.div`
//   padding: 0.8em 5em;
//   background-color: #f5f5f5;
//   color: #fff;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   ${BreakPoints.Tablet({ padding: '2em 2em' })};
//   ${BreakPoints.Andriod({ flexWrap: 'wrap' })};
//   ${BreakPoints.Ios({ gap: '1em' })};
// `;

// const ThirdHeaderSection = styled.div`
//   padding: 0.5em 5em;
//   display: flex;
//   justify-content: space-between;
//   background-color: #ff5d00;
//   align-items: center;

//   ${BreakPoints.Tablet({ padding: '1em 2em' })};
//   ${BreakPoints.Andriod({ flexDirection: 'column' })};
// `;

// const TitleHeader = styled.h2`
//   margin: 0;
//   font-family: 'Rajdhani', sans-serif;
//   font-size: 1.5rem;
//   color: #123;

//   a {
//     text-decoration: none;
//     color: inherit;
//   }
// `;

// const HeaderButton = styled.button`
//   color: #123;
// `;

// const HeaderPara = styled.p`
//   color: #123;
//   font-size: 1rem;
//   margin: 0;
// `;

// const Left = styled.div``;

// const Right = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1em;
//   position: relative;
// `;

// const SearchContainer = styled.div`
//   display: flex;
//   ${BreakPoints.Andriod({ order: 2, marginTop: '1em' })};
// `;

// const Search = styled.input`
//   border: 0;
//   outline: 0;
//   padding: 0.4em 1em;
//   font-family: 'Poppins', sans-serif;
//   ${BreakPoints.Andriod({ width: '100%' })};
// `;

// const SearchButton = styled.button`
//   display: inline-block;
//   padding: 0.4em;
//   background-color: #fff;
//   border: 0;
// `;

// const Menu = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: absolute;
//   top: 3em;
//   left: 50%;
//   width: 120px;
//   height: 100px;
//   background: white;
//   padding: 1em;
//   z-index: 99;
//   gap: 1em;

//   * {
//     width: 100%;
//     font-family: 'Poppins', sans-serif;
//     padding: 0.2em 1em;
//     color: #fff;
//     background: rgb(255, 93, 0);
//     border: 0;

//     &:hover {
//       opacity: 0.7;
//       color: #fff;
//     }
//   }

//   a {
//     text-decoration: none;
//   }
// `;
