import React from "react";
import Item from "../Item";

function RamadanDeals({ data }) {
  return (
    <div className="my-5" id="ramadanDeals">
      <p className="text-center text-green-700 text-3xl md:text-4xl font-light my-5">
        Ramadan Blessings Deals
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 md:px-10 lg:px-32">
        {data
          .filter((d) => {
            return d.category === "ramadan";
          })
          .map((d) => (
            <Item
              key={d._id}
              id={d._id}
              img={"https://broadway.onrender.com/" + d.img}
              name={d.name}
              price={d.price}
              prePrice={d.prePrice}
              sale={d.sale}
              no={d.no}
              description={d.description}
              data={data}
            />
          ))}
      </div>
    </div>
  );
}

export default RamadanDeals;
