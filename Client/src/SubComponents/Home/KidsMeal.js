import React from "react";
import Item from "../Item";

function KidsMeal({ data }) {
  return (
    <div className="my-5" id="kidsMeal">
      <p className="text-center text-green-700 text-3xl md:text-4xl font-light my-5">
        Kids Meal
      </p>
      <div className="grid grid-cols-2 md:grid-cols-2  sm:px-16 md:px-32 lg:px-56">
        {data
          .filter((d) => {
            return d.category === "kids";
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

export default KidsMeal;
