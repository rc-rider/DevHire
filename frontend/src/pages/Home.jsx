import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDevelopers from "../components/TopDevelopers";
import Banner from "../components/Banner";

const Home = () => {
    return (
        <div>
            <Header />
            <SpecialityMenu/>
            <TopDevelopers/>
            <Banner/>
        </div>
    )
}
export default Home;