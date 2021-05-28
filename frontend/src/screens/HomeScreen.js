import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      

      <div class="header-left">
        <h1 className="featured">Top Sellers</h1>
        <div class="divider"></div>
    </div>


      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false} useKeyboardArrows>
            {sellers.map((seller) => (
              <div className="carousel1" key={seller._id}>
                
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <Link to={`/seller/${seller._id}`}>
                  <h1 className="legend1 legend">{seller.seller.name}</h1>
                  </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}



      <br></br>
      <br></br>
      <br></br>
        <div className="row top">

              <div className="col-2">
              <img
                className="large"
                src="/uploads/computer.jpg"
                alt="img"
              ></img>
              </div>
              <div className="col-2 pad">
              <div class="header-left">
                <h1 className="featured">About Us</h1>
                <div class="divider"></div>
            </div>
                <h3 className="text-black">We will find the perfect product for you</h3>

                <p>Techstore is an e-commerce website that offers you the opportunity to buy It products from different sellers.</p>

                <p>Our It products have a variety of categories and brands, like the best smartphones in the market, the best tablets and the best televisions.</p>

              </div>
        </div>
        
        <br></br>
      <br></br>
      <br></br>


        <div className="carousel1">
          <img className="large1" src="/uploads/logonoir.png"/>
        </div>



      <br></br>
      <br></br>
      
      
   
      <div class="header-left">
        <h1 className="featured">Featured Products</h1>
        <div class="divider"></div>
    </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
