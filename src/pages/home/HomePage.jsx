import { useContext } from "react";
import Category from "../../components/category/Category";
// import Footer from "../../components/footer/Footer";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import Filter from "../../components/filter/Filter";
// import myContext from "../../context/myContext";

const HomePage = () => {
    return (
        <Layout>
            <HeroSection/>
            <Category/>
            {/* <Filter/> */}
            <HomePageProductCard/>
            <Track/>
            <Testimonial/>
        </Layout>
    );
}

export default HomePage;

