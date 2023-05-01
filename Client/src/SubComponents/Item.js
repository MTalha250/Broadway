import React, { useRef, useState, useContext } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CartContext } from "../Context/CartContext";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Item(props) {
  const [menu, setMenu] = useState("translate-y-[200%]");
  const radio = useRef([]);
  const [itemData, setItemData] = useState({
    crust: "",
    flavor: "",
    extra: "",
    dip: "",
    drink: "",
    size: "",
  });
  const navigate = useNavigate();

  const [CartData, setCartData] = useContext(CartContext);
  const [UsertData, setUserData] = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddToCart = () => {
    const dataSave = () => {
      let price = props.price;
      if (itemData.size === "10 Inch Medium") {
        price = 944;
      } else if (itemData.size === "13 Inch Large") {
        price = 1259;
      }

      if (itemData.extra) {
        price = price + 150;
      }
      if (!props.drink && itemData.drink) {
        price = price + 50;
      }
      if (!props.dip && itemData.dip) {
        price = price + 40;
      }

      setCartData([
        ...CartData,
        {
          name: props.name,
          img: props.img,
          price: price,
          tprice: price,
          id: props.id,
          qty: 1,
          ...itemData,
        },
      ]);

      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...CartData,
          {
            name: props.name,
            img: props.img,
            price: props.price,
            tprice: price,
            id: props.id,
            qty: 1,
            ...itemData,
          },
        ])
      );

      setMenu("translate-y-full");
      radio.current.forEach((r) => {
        r.checked = false;
      });
      setItemData({
        crust: "",
        flavor: "",
        extra: "",
        dip: "",
        drink: "",
        size: "",
      });
      toast("Item Added To Cart");
    };

    if (UsertData) {
      if (!props.flavors) {
        if (itemData.crust && itemData.flavor) {
          if (props.drink && props.dip) {
            if (itemData.drink && itemData.dip) {
              dataSave();
            } else {
              toast("Please Select Required Items");
            }
          } else {
            if (props.drink) {
              if (itemData.drink) {
                dataSave();
              } else {
                toast("Please Select Required Items");
              }
            } else if (props.dip) {
              if (itemData.dip) {
                dataSave();
              } else {
                toast("Please Select Required Items");
              }
            } else {
              dataSave();
            }
          }
        } else {
          toast("Please Select Required Items");
        }
      } else if (props.flavors) {
        if (itemData.size && itemData.crust) {
          dataSave();
        } else {
          toast("Please Select Required Items");
        }
      }
    } else {
      toast("You must be logged in");
      navigate("/login");
    }
  };
  return (
    <div className="flex flex-col items-center  m-2 my-3 sm:m-3" id={props.id}>
      <div className="relative">
        {props.sale ? (
          <span className="absolute -right-2 -top-2 animate-bounce bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-[10px] sm:text-xs font-semibold p-2 rounded-full">
            Save {props.sale}%
          </span>
        ) : null}
        {props.no ? (
          <span className="text-xs absolute bottom-3 right-3 bg-white text-yellow-500 text-sm p-1 px-2 rounded-xl flex items-center">
            <PersonOutlineOutlinedIcon className="scale-75" />{" "}
            <span className="text-black">x {props.no}</span>
          </span>
        ) : null}
        <img src={props.img} alt="" className="rounded-2xl" />
      </div>
      <p className="font-semibold my-1 sm:my-2 text-sm lg:text-base">
        {props.name}
      </p>
      {props.ingredients ? (
        <p className="font-extralight text-xs mb-2 self-start">
          {props.ingredients}
        </p>
      ) : null}
      <p className="my-0 text-xs sm:text-sm lg:text-base">
        <span className="">Rs {props.price}</span>{" "}
        <span className="text-red-500 text-[10px] md:text-xs lg:text-sm line-through">
          Rs {props.prePrice}
        </span>
      </p>
      <button
        className=" text-xs sm:text-sm lg:text-base px-8 sm:px-10 py-2 bg-yellow-100 rounded-3xl"
        onClick={() => {
          setMenu("translate-y-0");
        }}
      >
        Select
      </button>
      <div
        className={
          "w-full fixed h-screen top-0 left-0 z-50 flex justify-center items-center transition duration-500 " +
          menu
        }
      >
        <div className="w-full h-full md:w-[90%] md:h-[90%] lg:w-3/4 lg:h-4/5 bg-white shadow-2xl shadow-black p-3 flex flex-col md:flex-row relative overflow-y-scroll">
          <button
            className="fixed md:absolute bg-yellow-500 font-bold px-6 py-3 rounded-full right-5 bottom-14 shadow-2xl z-50 text-sm"
            onClick={handleAddToCart}
          >
            ADD TO ORDER <AddShoppingCartIcon />
          </button>
          <div className="w-full md:w-1/4 py-4 flex flex-col justify-between">
            <div>
              <img src={props.img} alt="" className="rounded-2xl" />
              <p className="text-lg font-bold my-2">{props.name}</p>
              <p className="text-sm my-2">
                {props.description || props.ingredients}
              </p>
              {!props.flavors ? (
                <p>
                  <span className="text-sm">Rs {props.price}</span>{" "}
                  <span className="text-red-500 text-xs line-through">
                    Rs {props.prePrice}
                  </span>
                </p>
              ) : null}
            </div>
            <span
              className="rounded-full shadow bg-yellow-500 p-3 cursor-pointer fixed md:absolute right-5 top-5 z-50"
              onClick={() => {
                setMenu("translate-y-[200%]");
                radio.current.forEach((r) => {
                  r.checked = false;
                });
                setItemData({
                  crust: "",
                  flavor: "",
                  extra: "",
                  dip: "",
                  drink: "",
                  size: "",
                });
              }}
            >
              <ClearOutlinedIcon />
            </span>
          </div>
          <div className="w-full md:w-3/4 md:px-4 md:overflow-y-scroll scrollbar-none">
            <p className="text-2xl font-bold">Select Options</p>
            {props.flavors ? (
              <div className="">
                <p className="text-cyan-600 my-2 text-lg">
                  SIZE <span className="text-xs">(Please Select)</span>
                </p>
                <div className="flex flex-col border-y px-2 mb-10">
                  <label className="p-2 font-light flex">
                    <input
                      type="radio"
                      ref={(item) => (radio.current[29] = item)}
                      name="size"
                      value="6 Inch Small"
                      onChange={handleChange}
                    />
                    <div className="flex justify-between w-full">
                      <span className="mx-4"> 6 INCH SMALL</span>
                      <span className="mx-4 text-yellow-700">
                        Rs {props.price}
                      </span>
                    </div>
                  </label>
                  <label className=" p-2 font-light flex">
                    <input
                      type="radio"
                      ref={(item) => (radio.current[30] = item)}
                      name="size"
                      value="10 Inch Medium"
                      onChange={handleChange}
                    />
                    <div className="border-y w-full py-2.5 flex justify-between">
                      <span className="mx-4">10 INCH MEDIUM</span>
                      <span className="mx-4 text-yellow-700">Rs 994</span>
                    </div>
                  </label>
                  <label className="p-2 font-light flex">
                    <input
                      type="radio"
                      ref={(item) => (radio.current[31] = item)}
                      name="size"
                      value="13 Inch Large"
                      onChange={handleChange}
                    />
                    <div className="w-full flex justify-between">
                      <span className="mx-4">13 INCH LARGE</span>
                      <span className="mx-4 text-yellow-700">Rs 1259</span>
                    </div>
                  </label>
                </div>
              </div>
            ) : null}
            <p className="text-cyan-600 my-2 text-lg">
              CRUST <span className="text-xs">(Please Select)</span>
            </p>
            <div className="flex w-full">
              {props.data
                .filter((d) => {
                  return d.category === "crusts";
                })
                .map((c, i) => (
                  <label
                    className="relative mx-2 w-1/3 sm:w-1/5 md:w-1/6"
                    key={c._id}
                  >
                    <input
                      ref={(item) => (radio.current[i] = item)}
                      type="radio"
                      name="crust"
                      value={c.name}
                      className="hidden peer"
                      onChange={handleChange}
                      required
                    />
                    <span className="hidden peer-checked:block bg-green-500 border border-white rounded-full text-white absolute right-2 top-2">
                      <DoneOutlinedIcon />
                    </span>
                    <img
                      src={"https://broadway.onrender.com/" + c.img}
                      alt=""
                      className="w-full shadow-md rounded-lg"
                    />
                    <p className="text-xs my-2.5">{c.name}</p>
                  </label>
                ))}
            </div>
            {!props.flavors ? (
              <div>
                <p className="text-cyan-600 mb-2 mt-4 text-lg">
                  FLAVORS <span className="text-xs">(Please Select)</span>
                </p>
                <div className="flex md:flex-wrap overflow-x-scroll w-full scrollbar-none">
                  {props.data
                    .filter((d) => {
                      return d.category === "flavors";
                    })
                    .map((f, i) => (
                      <label
                        className="relative mx-2 shrink-0 w-1/3 sm:w-1/5 md:w-1/6"
                        key={f._id}
                      >
                        <input
                          ref={(item) =>
                            (radio.current[
                              i +
                                props.data.filter((d) => {
                                  return d.category === "crusts";
                                }).length
                            ] = item)
                          }
                          type="radio"
                          name="flavor"
                          value={f.name}
                          className="hidden peer"
                          onChange={handleChange}
                          required
                        />
                        <span className="hidden peer-checked:block bg-green-500 border border-white rounded-full text-white absolute right-2 top-2">
                          <DoneOutlinedIcon />
                        </span>
                        <img
                          src={"https://broadway.onrender.com/" + f.img}
                          alt=""
                          className="w-full shadow-md rounded-lg"
                        />
                        <p className="text-xs my-2.5">{f.name}</p>
                      </label>
                    ))}
                </div>
              </div>
            ) : null}
            <p className="text-cyan-600 mb-2 mt-4 text-lg">EXTRA TOPPINGS</p>
            <div className="flex md:flex-wrap overflow-x-scroll scrollbar-none w-full">
              {props.data
                .filter((d) => {
                  return d.category === "extras";
                })
                .map((e, i) => (
                  <label
                    className="relative mx-2 shrink-0 w-1/3 sm:w-1/5 md:w-1/6"
                    key={e._id}
                  >
                    <input
                      ref={(item) =>
                        (radio.current[
                          i +
                            props.data.filter((d) => {
                              return d.category === "crusts";
                            }).length +
                            props.data.filter((d) => {
                              return d.category === "flavors";
                            }).length
                        ] = item)
                      }
                      type="radio"
                      name="extra"
                      value={e.name}
                      className="hidden peer"
                      onChange={handleChange}
                      required
                    />
                    <span className="hidden peer-checked:block bg-green-500 border border-white rounded-full text-white absolute right-2 top-2">
                      <DoneOutlinedIcon />
                    </span>
                    <img
                      src={"https://broadway.onrender.com/" + e.img}
                      alt=""
                      className="w-full shadow-md rounded-lg"
                    />
                    <p className="text-xs mt-2.5">{e.name}</p>
                    <p className="text-xs">+ Rs 160</p>
                  </label>
                ))}
            </div>
            <p className="text-cyan-600 mb-2 mt-4 text-lg">
              DRINKS{" "}
              {props.drink && <span className="text-xs">(Please Select)</span>}
            </p>
            <div className="flex md:flex-wrap overflow-x-scroll scrollbar-none w-full">
              {props.data
                .filter((d) => {
                  return d.category === "drinks";
                })
                .map((d, i) => (
                  <label
                    className="relative mx-2 shrink-0  w-1/3 sm:w-1/5 md:w-1/6"
                    key={d._id}
                  >
                    <input
                      ref={(item) =>
                        (radio.current[
                          i +
                            props.data.filter((d) => {
                              return d.category === "crusts";
                            }).length +
                            props.data.filter((d) => {
                              return d.category === "flavors";
                            }).length +
                            props.data.filter((d) => {
                              return d.category === "extras";
                            }).length
                        ] = item)
                      }
                      type="radio"
                      name="drink"
                      value={d.name}
                      className="hidden peer"
                      onChange={handleChange}
                      required
                    />
                    <span className="hidden peer-checked:block bg-green-500 border border-white rounded-full text-white absolute right-2 top-2">
                      <DoneOutlinedIcon />
                    </span>
                    <img
                      src={"https://broadway.onrender.com/" + d.img}
                      alt=""
                      className="w-full shadow-md rounded-lg"
                    />
                    <p className="text-xs mt-2.5">{d.name}</p>
                    {!props.drink && <p className="text-xs">+ Rs 50</p>}
                  </label>
                ))}
            </div>
            <p className="text-cyan-600 mb-2 mt-4 text-lg">
              DIPS{" "}
              {props.dip && <span className="text-xs">(Please Select)</span>}
            </p>
            <div className="flex md:flex-wrap overflow-x-scroll scrollbar-none w-full">
              {props.data
                .filter((d) => {
                  return d.category === "dips";
                })
                .map((d, i) => (
                  <label
                    className="relative mb-32 mx-2 shrink-0 w-1/3 sm:w-1/5 md:w-1/6"
                    key={d._id}
                  >
                    <input
                      ref={(item) =>
                        (radio.current[
                          i +
                            props.data.filter((d) => {
                              return d.category === "crusts";
                            }).length +
                            props.data.filter((d) => {
                              return d.category === "flavors";
                            }).length +
                            props.data.filter((d) => {
                              return d.category === "extras";
                            }).length +
                            props.data.filter((d) => {
                              return d.category === "drinks";
                            }).length
                        ] = item)
                      }
                      type="radio"
                      name="dip"
                      value={d.name}
                      className="hidden peer"
                      onChange={handleChange}
                      required
                    />
                    <span className="hidden peer-checked:block bg-green-500 border border-white rounded-full text-white absolute right-2 top-2">
                      <DoneOutlinedIcon />
                    </span>
                    <img
                      src={"https://broadway.onrender.com/" + d.img}
                      alt=""
                      className="w-full shadow-md rounded-lg"
                    />
                    <p className="text-xs mt-2.5">{d.name}</p>
                    {!props.dip && <p className="text-xs">+ Rs 40</p>}
                  </label>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
