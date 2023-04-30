import React from "react";
import Item from "../Item";

function PizzaFlavours({ data }) {
  return (
    <div id="flavors">
      <p className="text-center text-green-700 text-4xl font-light my-5">
        Pizza Flavors
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-10">
        {data
          .filter((f) => {
            return f.category === "flavors";
          })
          .map((f) => (
            <Item
              key={f._id}
              id={f._id}
              img={"https://broadway.onrender.com/" + f.img}
              name={f.name}
              price={f.price}
              prePrice={f.prePrice}
              ingredients={f.ingredients}
              sale={f.sale}
              flavors
              data={data}
            />
          ))}
      </div>
    </div>
  );
}

export default PizzaFlavours;
