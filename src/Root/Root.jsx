import { Outlet } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../Shared/Navber/Navbar";
import Footer from "../Shared/Navber/Footer/Footer";
AOS.init();

const Root = () => {
  return (
    <div className="mt-4 bg-gradient-to-r from-[#81d3e1]  to-[#ef91ec]">
      <Navbar></Navbar>
      <div className=" max-w-7xl mx-auto min-h-calc">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
