import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const [dateValue, setDateValue] = useState("desc"); // Default date sort to descending
  const [priceValue, setPriceValue] = useState(true); // Default price sort to low to high
  const [allProduct, setAllProduct] = useState([]);
  const [page, setPage] = useState(1); // Tracks the current page
  const [totalPages, setTotalPages] = useState(1); // Tracks the total pages
  const itemsPerPage = 9;

  // Handle form submission for search
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setSearch(form.serching.value);
  };

  // Fetch products with sorting and search functionality
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/AllProduct?page=${page}&limit=${itemsPerPage}&priceValue=${priceValue}&datevalue=${dateValue}&search=${search}`
        );
        setAllProduct(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [page, search, priceValue, dateValue]); // Added dependencies for priceValue and dateValue
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

      <div className="grid grid-cols-4 mt-8 gap-2">
        <div className="border-2 ">
          <div className="flex flex-col gap-2 mt-2 item-center justify-center">
            <button
              className="w-full"
              onClick={() => setPriceValue(false)}
            >
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
            <button
              className="w-full"
              onClick={() => setPriceValue(true)}
            >
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
            <button
              className="w-full"
              onClick={() => setDateValue('asc')}
            >
              <a
                href="#_"
                className="relative inline-block px-4 py-2 font-medium group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">
                  Newest date
                </span>
              </a>
            </button>
          </div>
        </div>

        <div className="border-2 col-span-3">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProduct.map((p) => (
              <div key={p._id} className="">
                <a href="#" className="group relative block h-[370px] md:h-96">
                  <span className="absolute inset-0 border-2 border-dashed border-black"></span>
                  <div className="relative flex h-full transform items-end border-2 border-black transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                    <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                      <img
                        className="h-56 w-80"
                        src={p.product_image}
                        alt="Product"
                      />
                      <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                        {p.product_name}
                      </h2>
                      <div className="flex gap-10">
                        <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                          {p.product_price} Tk
                        </h2>
                        <h2 className="mt-4 text-xl font-medium sm:text-2xl">
                          {new Date(p.date).toLocaleDateString()}  <span>{p.product_no}</span>
                        </h2>
                      </div>
                    </div>
                    <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
                      <figure className="w-full bg-cover">
                        <img
                          src={p.product_image}
                          alt="Product"
                          className="h-64 w-full"
                        />
                      </figure>
                      <p className="mt-4 text-sm">{p.brand_name}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
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
