import React, { useEffect } from "react";
import Product from "../components/Product";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listTopSellers } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "../styles/carousel.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  .carousel .slick-arrow.slick-prev,
  .carousel .slick-arrow.slick-next {
    background: #fcfcfc;
    width: 47px;
    height: 104px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    box-shadow: 1px 2px 10px -1px rgb(0 0 0 / 30%);
  }
  .carousel .slick-prev {
    left: 0;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
  .carousel .slick-next {
    right: 0;
    border-bottom-left-radius: 7px;
    border-top-left-radius: 7px;
  }
  .slick-prev::before,
  .slick-next::before {
    display: none;
  }
  .custom-indicator {
    bottom: -65px;
  }
  .custom-indicator li {
    width: 50px;
    height: 50px;
    filter: grayscale(100%);
  }
  .custom-indicator li.slick-active {
    filter: grayscale(0%);
  }
  .multi__image:hover {
    transform: scale(1.1);
    transition: 500ms;
  }

  .carousel_container {
    background-image: url("https://i.pinimg.com/564x/2f/71/83/2f7183ba327a64ebce89b0f6c8f1ba08.jpg");
    ${
      "" /* background-image: url("https://raw.githubusercontent.com/navvitech/carousels-in-react/main/src/assets/carouselImage1.jpg"); */
    }
  }

  .carousel_inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .legend {
    background: white;
    padding: 5px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
`;

const PreviousBtn = (props) => {
  // console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos
        style={{
          color: "black",
          fontSize: "30px",
        }}
      />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "black", fontSize: "30px" }} />
    </div>
  );
};

function HomePage() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  let userTopSellersList = useSelector((state) => state.userTopSellersList);
  let {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
    console.log(sellers);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container>
      <div className="page_content">
        <h2>Top Sellers</h2>
        {loadingSellers ? (
          <LoadingBox></LoadingBox>
        ) : errorSellers ? (
          <MessageBox variant="danger">{errorSellers}</MessageBox>
        ) : (
          <>
            {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
            <div class="carousel">
              <Slider
                autoplay
                autoplaySpeed={2000}
                // dots
                initialSlide={2}
                infinite
                prevArrow={<PreviousBtn />}
                nextArrow={<NextBtn />}
                customPaging={(i) => {
                  return (
                    <div>
                      <img
                        src={sellers[i]}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                  );
                }}
                dotsClass="slick-dots custom-indicator"
              >
                {/* <div class="carousel_container" key={sellers[0]._id}>
                  <div class="carousel_inner">
                    <Link to={`/seller/${sellers[0]._id}`}>
                      <img
                        src={sellers[0].seller.logo}
                        alt={sellers[0].seller.name}
                        style={{ width: "fit-content", height: "40vh" }}
                      />
                      <p className="legend">{sellers[0].seller.name}</p>
                    </Link>
                  </div>
                </div> */}
                {sellers.map((seller) => (
                  <div class="carousel_container" key={seller._id}>
                    <div class="carousel_inner">
                      <Link to={`/seller/${seller._id}`}>
                        <img
                          src={seller.seller.logo}
                          alt={seller.seller.name}
                          style={{ width: "100%", height: "50vh" }}
                        />
                        <p className="legend">{seller.seller.name}</p>
                      </Link>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* <Carousel shotArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel> */}
          </>
        )}
        <div className="row">
          <h2>Featured Products</h2>
          <button onClick={() => navigate(`/search/name`)}>
            See all Products
          </button>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products?.length === 0 && (
              <MessageBox>No Product Found</MessageBox>
            )}
            <div className="row center">
              {products?.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default HomePage;
