import React from "react";
import Item from "../Item";

function MidnightDeals({ data }) {
  return (
    <div className="my-5" id="midnightDeals">
      <p className="text-center text-green-700 text-3xl md:text-4xl font-light my-5">
        Midnight Deals
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 sm:px-10 lg:px-32">
        {data
          .filter((d) => {
            return d.category === "midnight";
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
              drink
              dip
              data={data}
            />
          ))}
      </div>
    </div>
  );
}

export default MidnightDeals;
