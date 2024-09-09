import SpecialityMenu from "../components/SpecialityMenu";
import Header from "../components/Header";
import React from "react";
import TopDoctor from "@/components/TopDoctor";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctor />
    </div>
  );
};

export default Home;
