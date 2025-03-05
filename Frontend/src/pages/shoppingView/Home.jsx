import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundOne from "../../assets/background4.jpg";
import backgroundTwo from "../../assets/background1.webp";
import backgroundThree from "../../assets/background3.webp";
import backgroundFour from "../../assets/background2.jpg";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightningIcon,
  Flower,
  Ribbon,
  ShirtIcon,
  ShoppingBagIcon,
  ShovelIcon,
  TagIcon,
  Target,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, getShopProduct } from "@/store/shop/shopProduct.slice";
import ShopProductTile from "./ShopProductTile";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightningIcon },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];
const brandWithIcons = [
  { id: "nike", label: "Nike", icon: TagIcon },
  { id: "adidas", label: "Adidas", icon: ShoppingBagIcon },
  { id: "puma", label: "Puma", icon: ShovelIcon },
  { id: "reebok", label: "Reebok", icon: Ribbon },
  { id: "zara", label: "Zara", icon: Target },
  { id: "goldStar", label: "goldStar", icon: Flower },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const navigate = useNavigate();
  const slides = [
    backgroundOne,
    backgroundTwo,
    backgroundThree,
    backgroundFour,
  ];
  //handling the navigation of category and Brand
  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  // slides background automatice every 5 sec
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      getShopProduct({ filterParams: {}, sortParams: "price-low-high" })
    );
  }, [dispatch]);

  // console.log("ajkgjad", productList)

  return (
    <div className="flex flex-col min-h-screen">
      {/* hero section */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {slides.map((slide, index) => (
            <img
              src={slide}
              alt="Hero Background"
              key={index}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
                ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        {/* for left slider */}
        <div className="z-10 absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent">
          <Button
            onClick={() => {
              setCurrentSlide(
                (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
              );
            }}
            variant="outline"
            size="icon"
            className="flex items-center justify-center bg-transparent"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Content Container */}
        <div className="absolute top-1/4 md:left-20 z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
          {/* slider */}
          {/* Text Content */}
          <div className="text-center lg:text-left lg:w-1/3 ">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Upgrade Your Lifestyle
            </h1>
            <p className="text-lg lg:text-xl mb-8">
              Discover premium products designed to make your life better.
            </p>
            <Link to="/shop/listing">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
        {/* for right slider */}
        <div className="z-10 absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent">
          <Button
            onClick={() => {
              setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
            }}
            variant="outline"
            size="icon"
            className="bg-tansparent flex items-center justify-center "
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </section>
      {/* category */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 uppercase">
            Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((CategoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(CategoryItem, "category")
                }
                key={CategoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <CategoryItem.icon />
                  <span className="font-bold">{CategoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* brand */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 uppercase">
            Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcons.map((brandItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(brandItem, "brand")
                }
                key={brandItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* products */}
      <section 
      onClick={()=> navigate("/shop/listing")}
      className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShopProductTile
                    key={productItem._id}
                    product={productItem}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
