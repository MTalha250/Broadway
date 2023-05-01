import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CartContext } from "../Context/CartContext";
import EastIcon from "@mui/icons-material/East";
import CartItem from "../SubComponents/Cart/CartItem";
import { Link } from "react-router-dom";
function Cart(props) {
  const [cartData, setCartData] = useContext(CartContext);
  const [qty, setQty] = useState(1);

  const handleCart = () => {
    props.getCart("translate-y-full");
  };

  const handleTotal = () => {
    let total = 0;
    cartData.map((item) => (total = total + item.tprice));
    return total;
  };

  return (
    <div
      className={
        "w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center transition duration-500 transition duration-500 " +
        props.open
      }
    >
      <div className="w-full h-full md:w-[90%] md:h-[90%] lg:w-3/4 lg:h-4/5 bg-white shadow-2xl shadow-black p-3 relative overflow-hidden">
        <button
          className="absolute right-5 top-5 text-yellow-500 scale-150"
          onClick={handleCart}
        >
          <CloseIcon />
        </button>
        <p className="font-bold text-2xl text-center mb-5">Your Cart</p>
        <div className="overflow-scroll h-[85%]">
          <div>
            {cartData.map((c, i) => (
              <CartItem
                key={i}
                img={c.img}
                name={c.name}
                crust={c.crust}
                flavor={c.flavor}
                dip={c.dip}
                drink={c.drink}
                extra={c.extra}
                id={c.id}
                price={c.price}
                tprice={c.tprice}
                qty={c.qty}
                size={c.size}
              />
            ))}
          </div>

          <div className="mt-20">
            {cartData.length > 0 ? (
              <div>
                <p className="text-sm font-light flex justify-between px-2 py-1">
                  <span>Subtotal:</span>
                  <span>Rs {handleTotal()}</span>
                </p>
                <p className="text-sm font-light flex justify-between px-2 py-1">
                  <span>GST(16%):</span>
                  <span>Rs {Math.round(handleTotal() * 0.16)}</span>
                </p>
                <p className="text-sm font-light flex justify-between px-2 py-1">
                  <span>Delivery:</span>
                  <span>Rs 50</span>
                </p>
                <p className="text-sm font-bold flex justify-between px-2 py-2">
                  <span>Total:</span>
                  <span>
                    Rs {handleTotal() + Math.round(handleTotal() * 0.16) + 50}
                  </span>
                </p>
                <Link
                  to="/checkout"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    handleCart();
                  }}
                  className="w-full text-center bg-yellow-500 py-2 border-x-4 border-white rounded-full absolute bottom-8 left-0 font-bold"
                >
                  Continue &nbsp;
                  <EastIcon />
                </Link>
              </div>
            ) : (
              <h1 className="text-center font-extralight text-xl">
                Cart Is Empty
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
