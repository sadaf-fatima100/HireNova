import React from "react";
import Hero from "../components/Hero";
import TopNiches from "../components/TopNiches";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <TopNiches />

      {/* How It Works Section */}
      <HowItWorks />

      <Footer />
    </>
  );
};

export default Home;
