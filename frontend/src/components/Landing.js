// // Landing.js

// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { Carousel } from 'react-bootstrap';
// import { FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
// import { ImLocation } from 'react-icons/im';
// import { BiEnvelope, BiMobileAlt } from 'react-icons/bi';
// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
// import { BsClock } from 'react-icons/bs';

// // Image imports
// import Image1 from '../assets/images/slide-1.jpg';
// import Image2 from '../assets/images/slide-2.jpg';
// import Image3 from '../assets/images/slide-3.jpg';
// import Bg from '../assets/images/banner-1.jpg';

// // Responsive breakpoints (you can customize these as needed)
// import * as BreakPoints from '../Responsive';

// // Data for categories and products
// import { data } from '../data/data';

// // Styled Components
// const Container = styled.div`
//   position: relative;
// `;

// const CarouselContainer = styled.div`
//   display: flex;
//   text-align: start;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: flex-end;
//   font-family: 'Poppins', sans-serif;

//   a {
//     display: inline-block;
//     padding: 0.75em 1em;
//     text-decoration: none;
//     background-color: rgb(255, 93, 0);
//     color: #fff;
//     align-self: flex-start;

//     &:hover {
//       opacity: 0.7;
//     }
//   }

//   ${BreakPoints.Andriod({ display: 'none' })};
// `;

// const Title = styled.h3`
//   font-size: 1.7rem;
// `;

// const Details = styled.p``;

// const ButtonContainer = styled.div`
//   position: absolute;
//   background-color: rgba(0, 0, 0, 0.6);
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 1em;
//   opacity: 0;
//   cursor: pointer;
//   transition: all 650ms ease-in;
// `;

// const ProductContainer = styled.div`
//   width: 11rem;
//   position: relative;

//   &:hover ${ButtonContainer} {
//     opacity: 1;
//   }

//   ${BreakPoints.TabVertical({ width: '45%' })};
//   ${BreakPoints.Andriod({ width: '100%' })};
//   margin-bottom: 1em;
// `;

// const Button = styled.button`
//   background-color: #fff;
//   border: 0;
//   border-radius: 100%;
//   display: inline-block;
//   padding: 0.6em 0.8em;

//   a {
//     color: inherit;
//   }
// `;

// const Image = styled.img`
//   width: 100%;
//   height: 170px;
//   ${BreakPoints.Andriod({ maxWidth: '400px', height: '350px', margin: '0 auto', display: 'block' })};
// `;

// const CategoryItemContainer = styled.div`
//   min-width: 20rem;
//   flex-grow: 1;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 3em 2em 3em 2em;
//   flex-basis: 20%;
//   position: relative;
//   min-height: 350px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   text-align: center;

//   a {
//     display: inline-block;
//     padding: 0.5em 3em;
//     color: #000;
//     background-color: #fff;
//     align-self: center;
//     font-family: 'Poppins', sans-serif;
//     text-decoration: none;
//     transition: all 350ms ease-in;

//     &:hover {
//       transform: translateX(10px);
//     }
//   }

//   ${BreakPoints.Ios({ minWidth: '10rem' })};
//   ${BreakPoints.LG({ minHeight: '450px' })};
// `;

// const CategoryTitle = styled.h3`
//   font-size: 2.5rem;
//   font-family: 'Rajdhani';
//   color: #fff;
//   font-weight: 700;
//   margin-bottom: 0.7em;
// `;

// const CategoryDesc = styled.p``;

// const AnnounceMentContainer = styled.div`
//   text-align: center;
//   padding: 4em 1em;
//   background-image: url(${Bg});
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-color: rgba(0, 0, 0, 0.7);
//   background-blend-mode: multiply;
//   color: #fff;
// `;

// const AnnounceMentTitle = styled.h3`
//   font-family: 'Rajdhani', sans-serif;
//   font-size: 3rem;
//   font-weight: 600;
// `;

// const StyledLink = styled(Link)`
//   display: inline-block;
//   padding: 0.5em 2em;
//   background-color: rgb(255, 93, 0);
//   color: #fff;
//   font-family: 'Poppins', sans-serif;
//   text-decoration: none;

//   &:hover {
//     opacity: 0.7;
//     color: #fff;
//   }
// `;

// const Desc = styled.p`
//   font-family: 'Poppins', sans-serif;
//   font-size: 1rem;
//   font-weight: 300;
// `;

// const FooterContainer = styled.footer`
//   margin-top: auto;
// `;

// const FirstFooter = styled.div`
//   display: flex;
//   padding: 4em 5em;
//   justify-content: space-between;
//   @media (max-width: 768px) {
//     flex-wrap: wrap;
//     gap: 1em;
//     padding: 2em 2em;
//   }
// `;

// const SecondFooter = styled.div`
//   text-align: center;
//   padding: 1em;
//   background-color: rgb(245, 245, 245);
// `;

// const Column = styled.div`
//   flex-grow: 1;
//   width: ${(props) => (props.width ? props.width + '%' : 'auto')};
//   @media (max-width: 768px) {
//     width: 48%;
//   }
//   @media (max-width: 480px) {
//     width: 100%;
//   }
// `;

// const FooterTitle = styled.h3`
//   font-family: 'Rajdhani';
//   margin-bottom: 1em;
// `;

// const List = styled.ul`
//   margin-top: 0.5em;
//   list-style: none;
//   padding-left: 0;
// `;

// const ListItem = styled.li`
//   margin-bottom: 0.5em;
//   font-family: 'Poppins', sans-serif;
// `;

// const ListLink = styled(Link)`
//   text-decoration: none;
//   color: #123;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0em 1em;
//   &:focus {
//     outline: 0;
//     border: 1px solid #123;
//   }
//   @media (max-width: 1024px) {
//     max-width: 300px;
//   }
// `;

// const SearchContainer = styled.div`
//   margin-top: 1em;
//   display: flex;
//   gap: 0.5em;
// `;

// const ButtonSubscribe = styled.button`
//   display: inline-block;
//   border: 0;
//   background-color: rgb(255, 93, 0);
//   padding: 0.4em 1em;
//   color: #fff;
//   font-family: 'Poppins', sans-serif;
//   &:hover {
//     opacity: 0.7;
//   }
// `;

// const Icon = styled.a`
//   background: ${(props) => props.bg};
//   padding: 0.5em 0.6em;
//   border-radius: 50%;
//   cursor: pointer;
// `;

// const Icons = styled.div`
//   display: flex;
//   margin-top: 1em;
//   gap: 10px;
// `;

// const FooterDesc = styled.p`
//   margin: 0;
//   font-family: 'Poppins', sans-serif;
// `;

// // Component logic
// function Slider() {
//   return (
//     <Container data-aos="fade-up" data-aos-duration="2000">
//       <Carousel.Caption className="fixed-caption d-none d-md-block">
//         <CarouselContainer>
//           <Title>For All your Home and Hardware Needs</Title>
//           <Details>
//             Find everything from indoor to outdoor tools for both construction and household—you name it, we got it.
//           </Details>
//           <Link to="/products">See Products</Link>
//         </CarouselContainer>
//       </Carousel.Caption>
//       <Carousel indicators={false} controls={false}>
//         <Carousel.Item>
//           <img className="d-block w-100" src={Image1} alt="Image 1" />
//         </Carousel.Item>
//         <Carousel.Item>
//           <img className="d-block w-100" src={Image2} alt="Image 2" />
//         </Carousel.Item>
//         <Carousel.Item>
//           <img className="d-block w-100" src={Image3} alt="Image 3" />
//         </Carousel.Item>
//       </Carousel>
//     </Container>
//   );
// }

// function CategoryItem({ item }) {
//   return (
//     <CategoryItemContainer>
//       <Image src={item?.img} alt={item?.name} />
//       <CategoryTitle>{item?.name}</CategoryTitle>
//       <Link to={`/products/type/${item?.link}`}>View</Link>
//     </CategoryItemContainer>
//   );
// }

// function Category() {
//   return (
//     <div className="category-container">
//       <div className="category-items">
//         {data?.category?.map((item) => (
//           <CategoryItem key={item?.id} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function Landing() {
//   return (
//     <div className="Landing">
//       <Slider />
//       <Category />
//     </div>
//   );
// }


// Landing.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import Image1 from '../assets/images/slide-1.jpg';
import Image2 from '../assets/images/slide-2.jpg';
import Image3 from '../assets/images/slide-3.jpg';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
`;

const FullPageContainer = styled.div`
  position: fixed; /* Important for true full-page */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* Ensures it's behind other content */
`;

const FullPageImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const CenterCaption = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  color: white;
  max-width: 800px;
  width: 90%;
`;

const CaptionContainer = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

function FullPageCarousel() {
  return (
    <>
      <GlobalStyle />
      <FullPageContainer data-aos="fade-up" data-aos-duration="2000">
        <Carousel indicators={false} controls={false} fade interval={5000}>
          {[Image1, Image2, Image3].map((img, i) => (
            <Carousel.Item key={i}>
              <FullPageImage src={img} alt={`Slide ${i + 1}`} loading="lazy" />
            </Carousel.Item>
          ))}
        </Carousel>
      </FullPageContainer>

      <CenterCaption>
        <CaptionContainer>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            For All Your Home and Hardware Needs
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            Find everything from indoor to outdoor tools for both construction and household—you name it, we got it.
          </p>
          <Link
  to="/products"
  style={{
    backgroundColor: '#007bff', // Blue background
    color: '#fff',              // White text
    textDecoration: 'none',
    fontSize: '1.1rem',
    padding: '0.5em 1em',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    display: 'inline-block',
  }}
>
  Browse Our Products
</Link>
*

        </CaptionContainer>
      </CenterCaption>
    </>
  );
}

export default function Landing() {
  return (
    <div className="Landing" style={{ margin: 0, padding: 0 }}>
      <FullPageCarousel />
    </div>
  );
}
