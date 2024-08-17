import axios from "axios";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

const Home = () => {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [dateValue, setDateValue] = useState("desc"); // Default date sort to descending
  const [priceValue, setPriceValue] = useState(true); // Default price sort to low to high
  const [category, setCategory] = useState(""); // To track the selected category
  const [brands, setBrands] = useState([]); // To track selected brands
  const [allProduct, setAllProduct] = useState([]);
  const [page, setPage] = useState(1); // Tracks the current page
  const [totalPages, setTotalPages] = useState(1); // Tracks the total pages
  const itemsPerPage = 12;

  // Handle form submission for search
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setSearch(form.serching.value);
  };
  console.log(priceRange);

  // Handle brand checkbox selection
  const handleBrandChange = (brand) => {
    if (brands.includes(brand)) {
      setBrands(brands.filter((b) => b !== brand));
    } else {
      setBrands([...brands, brand]);
    }
  };

  // Handle category selection
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  // Fetch products with sorting, search, brand, and category filters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/AllProduct?page=${page}&limit=${itemsPerPage}&priceValue=${priceValue}&datevalue=${dateValue}&search=${search}&category=${category}&brands=${brands.join(
            ","
          )}&priceRange=${priceRange}`
        );
        setAllProduct(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, priceValue, dateValue, category, brands]); // Added dependencies for category and brands

  console.log(allProduct);

  // Pagination controls
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="w-full mt-8 text-black">
      <div className="">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mt-3 bg-clip-text">
            E-Dokan All Product
          </h1>
          <p className="lg:w-2/3 w-full px-2 md:px-10 lg:px-0 font-bold text-center">
            You can get the latest budget smartphones to high-configuration
            mobile phones at Star Tech. Check below and Order yours now!
          </p>
        </div>
        <div className="flex justify-center max-w-7xl px-10">
          <form onSubmit={handleSubmit}>
            <div className="relative z-10 flex space-x-2 rounded-md mt-2 bg-white w-full">
              <div className=" ">
                <input
                  type="text"
                  name="serching"
                  className="input border-white bg-white w-full mr-60"
                  placeholder="Search by Products Name"
                />
              </div>
              <div className="flex-[0_0_auto]">
                <button
                  type="submit"
                  className="size-[46px] text-sm md:w-36 w-20 inline-flex justify-center items-center gap-x-2 font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none text-black"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-5 mt-8 gap-2">
        {/* Filters Section */}
        <div className="border-2 bg-slate-200 col-span-2 md:col-auto">
          <div className="pb-3">
            <h1 className="bg-slate-400 lg:text-2xl  text-center py-1">
              Filter by Price Range
            </h1>
            <select
              className="py-3  border-2  w-full bg-slate-200 "
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">All Price Ranges</option>
              <option value="0-50">10K - 20k</option>
              <option value="50-100">21k - 50k</option>
              <option value="100-500">51k - 200K</option>
            </select>
          </div>
          <div>
            <div className="menu-dropdown-toggle bg-slate-200">
              <div tabIndex={0} role="button" className="m-1">
                <h1 className="bg-slate-400 lg:text-2xl text-center py-1">
                  Sort by  Category
                </h1>
              </div>
              <ul tabIndex={0} className="dropdown-open menu  z-[1] md:w-52 p-2 ">
                <li onClick={() => handleCategoryChange("mobile")}>
                  <a className="hover:bg-pink-300">Mobile</a>
                </li>
                <li onClick={() => handleCategoryChange("tablet")}>
                  <a className="hover:bg-pink-300"> Tablet</a>
                </li>
                <li onClick={() => handleCategoryChange("laptop")}>
                  <a className="hover:bg-pink-300">Laptop</a>
                </li>
                <li onClick={() => handleCategoryChange("smartwatch")}>
                  <a className="hover:bg-pink-300">Smartwatch</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="py-2 space-y-2">
            <h1 className="bg-slate-400 lg:text-2xl text-center py-1">
              Sort by Price and Date
            </h1>
            <button
              className="w-full btn rounded-none bg-gray-200 text-black hover:bg-pink-300 text-start"
              onClick={() => setPriceValue(false)}
            >
              Price High to Low
            </button>
            <button
              className="w-full btn rounded-none bg-gray-200 text-black hover:bg-pink-300 text-start"
              onClick={() => setPriceValue(true)}
            >
              Price Low to High
            </button>
            <button
              className="w-full btn rounded-none bg-gray-200 text-black hover:bg-pink-300 text-start"
              onClick={() => setDateValue("asc")}
            >
              Newest Date
            </button>
          </div>

          <div className="py-3">
            <h1 className="bg-slate-400 lg:text-2xl text-center py-1">
              Sort by Brand Name
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 text-center px-2 gap-2 mt-3">
              {[
                "TechBrand",
                "GizmoTech",
                "EliteTech",
                "SmartGear",
                "PhoneWorld",
                "WearableTech",
                "NextGen",
              ].map((brand) => (
                <div className="form-control" key={brand}>
                  <label className="cursor-pointer label">
                    <h1 className="label-text text-xl text-black">{brand}</h1>
                    <input
                      type="checkbox"
                      onChange={() => handleBrandChange(brand)}
                      className="checkbox checkbox-secondary"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="border-2 col-span-3 md:col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {allProduct.map((p) => (
              <div key={p._id} className="  text-white shadow-xl">
                <div className="relative p-2">
                  <figure className="flex justify-center items-center">
                    <img
                      className="w-64 h-52  hover:scale-105 hover:delay-75  object-cover"
                      src={p.product_image}
                    />
                  </figure>
                  <p className="card-lavel bg-[#f81276] flex items-center gap-2 bg-red absolute py-3 px-7 -bottom-0 left-14 text-white">
                    <IoLocationOutline size={20} />
                    <span>{p.product_category}</span>
                  </p>
                </div>

                <div className="md:p-4 px-2 md:px-14 lg:px-3">
                  <div className="flex justify-between items-center gap-2">
                    <h2 className="font-semibold text-xl md:text-2xl text-nowrap ">
                      {p.product_name}
                    </h2>
                    <p className="font-semibold text-red  ">
                      {p.product_price} TK
                    </p>
                  </div>

                  <div className="flex  justify-between">
                    <p>{new Date(p.date).toLocaleDateString()}</p>
                    <p>{p.brand_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center md:gap-20 my-4 md:space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className=" px-2  bg-pink-500 text-white hover:text-black  rounded hover:bg-gray-300"
            >
              Prev
            </button>
            <p className="px-2">
              Page {page} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-2 bg-pink-700 rounded text-white hover:text-black hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
