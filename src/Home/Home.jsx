import axios from "axios";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

const Home = () => {
  const [search, setSearch] = useState("");
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
          )}`
        );
        setAllProduct(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
          <p className="w-2/3 font-bold text-center">
            Sit amet consectetur adipisicing elit. Nesciunt velit corporis
            aspernatur ad natus cupiditate vel! Corporis vero. You can get the
            latest budget smartphones to high-configuration mobile phones at
            Star Tech. Check below and Order yours now!
          </p>
        </div>
        <div className="flex justify-center max-w-7xl">
          <form onSubmit={handleSubmit}>
            <div className="relative z-10 flex space-x-2 rounded-md mt-2 bg-white w-full">
              <div className="">
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
        <div className="border-2 bg-slate-200">
          <div>
            <div className="menu-dropdown-toggle bg-slate-200">
              <div tabIndex={0} role="button" className="m-1">
                <h1 className="bg-slate-500 text-2xl text-center py-1">
                  Sort by Product Category
                </h1>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-open menu rounded-box z-[1] w-52 p-2 shadow"
              >
                <li onClick={() => handleCategoryChange("mobile")}>
                  <a>Mobile</a>
                </li>
                <li onClick={() => handleCategoryChange("tablet")}>
                  <a>Tablet</a>
                </li>
                <li onClick={() => handleCategoryChange("laptop")}>
                  <a>Laptop</a>
                </li>
                <li onClick={() => handleCategoryChange("smartwatch")}>
                  <a>Smartwatch</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="py-2">
            <h1 className="bg-slate-500 text-2xl text-center py-1">
              Sort by Price and Date
            </h1>
            <button className="w-full" onClick={() => setPriceValue(false)}>
              <a
                href="#_"
                className="relative inline-block px-4 py-2 font-medium group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">
                  Price High to Low
                </span>
              </a>
            </button>
            <button className="w-full" onClick={() => setPriceValue(true)}>
              <a
                href="#_"
                className="relative inline-block px-4 py-2 font-medium group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">
                  Price Low to High
                </span>
              </a>
            </button>
            <button className="w-full" onClick={() => setDateValue("asc")}>
              <a
                href="#_"
                className="relative inline-block px-4 py-2 font-medium group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">
                  Newest Date
                </span>
              </a>
            </button>
          </div>

          <div className="py-3">
            <h1 className="bg-slate-500 text-2xl text-center py-1">
              Sort by Brand Name
            </h1>
            <div className="grid grid-cols-2 text-center px-2 gap-2 mt-3">
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
        <div className="border-2 col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {allProduct.map((p) => (
              <div key={p._id} className="  text-white shadow-xl">
                <div className="relative p-2">
                  <figure>
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

                <div className="p-4">
                  <div className="flex justify-between items-center gap-2">
                    <h2 className="font-semibold text-2xl text-nowrap ">
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

          <div className="flex justify-center gap-20 mt-8 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 bg-pink-400 text-black rounded hover:bg-gray-300"
            >
              Prev
            </button>
            <p>
              Page {page} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-4 py-2 bg-pink-700 text-black rounded hover:bg-gray-300"
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
