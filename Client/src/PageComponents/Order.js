import React from "react";
import MidnightDeals from "../SubComponents/Home/MidnightDeals";
import RamadanDeals from "../SubComponents/Home/RamadanDeals";
import KidsMeal from "../SubComponents/Home/KidsMeal";
import PizzaFlavours from "../SubComponents/Home/PizzaFlavours";

function Home({ data }) {
  return (
    <div>
      <div className="p-3 w-full flex md:justify-center sticky top-14 md:top-16 z-10 overflow-scroll scrollbar-none">
        <a
          href="#midnightDeals"
          className="py-3 px-4 bg-gray-200 m-2 rounded-3xl text-sm shrink-0 no-underline text-black cursor-pointer"
        >
          Midnight Deals
        </a>
        <a
          href="#ramadanDeals"
          className="py-3 px-4 bg-gray-200 m-2 rounded-3xl text-sm shrink-0 no-underline text-black cursor-pointer focus:bg-yellow-500"
        >
          Ramadan Blessings Deals
        </a>

        <a
          href="#kidsMeal"
          className="py-3 px-4 bg-gray-200 m-2 rounded-3xl text-sm shrink-0 no-underline text-black cursor-pointer"
        >
          Kids Meal
        </a>
        <a
          href="#flavors"
          className="py-3 px-4 bg-gray-200 m-2 rounded-3xl text-sm shrink-0 no-underline text-black cursor-pointer"
        >
          Pizza Flavors
        </a>
        {/* <a className="py-3 px-4 bg-gray-200 m-2 rounded-3xl text-sm shrink-0 no-underline text-black cursor-pointer">
          Beverages & Extras
        </a> */}
      </div>
      <MidnightDeals data={data} />
      <RamadanDeals data={data} />
      <KidsMeal data={data} />
      <PizzaFlavours data={data} />
    </div>
  );
}

export default Home;
