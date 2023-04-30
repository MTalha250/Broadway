import React from "react";

function Menu({ data }) {
  return (
    <div className="py-5 md:py-10 px-5 sm:px-20 md:px-32 lg:px-52">
      <h1 className="text-4xl font-bold text-center my-10">Menu</h1>
      {data
        .filter((d) => {
          return d.category === "menu";
        })
        .map((d, i) => (
          <img src={"https://broadway.onrender.com/" + d.img} alt="" key={i} />
        ))}
    </div>
  );
}

export default Menu;
