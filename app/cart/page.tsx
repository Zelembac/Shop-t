"use client";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";

export default function Cart() {
  const dispach = useDispatch();

  function increaseCount(items: { id: number; name: string; price: number; qty: number }) {
    dispach(addToCart({ ...items, qty: items.qty + 1 }));
  }

  function decreaseCount(items: { id: number; name: string; price: number; qty: number }) {
    if (items.qty == 1) {
      dispach(removeFromCart({ ...items }));
    } else {
      dispach(addToCart({ ...items, qty: items.qty - 1 }));
    }
  }

  const { loading, cartItems, itemPrice, shippingPrice, taxPrice, totalPrice } = useSelector(
    (state: any) => state.cart
  );
  return (
    <div className="flex items-center justify-items-center h-[84%] w-full flex-col bg-slate-500 ">
      <div className="h-5/6 w-full flex justify-start items-center flex-col p-5  ">
        {itemPrice == 0
          ? "Cart is empty"
          : cartItems.map((items: { id: number; name: string; price: number; qty: number }) => (
              <div
                key={items.id}
                className="w-2/6 h-[10%] rounded-sm bg-zinc-700 flex justify-center items-center  p-2 m-2"
              >
                <div className="w-1/3 h-full flex justify-center items-center flex-col">
                  <h2 className="w-full h-1/2 text-lg font-semibold">{items.name}</h2>
                  <div className="w-full h-1/2">{items.price}$</div>
                </div>
                <div className="w-2/3 h-full flex justify-evenly items-center text-lg font-semibold">
                  <button
                    onClick={() => decreaseCount({ ...items })}
                    className="bg-neutral-800 hover:bg-neutral-600 transition w-1/6 h-3/4 rounded hover:rounded-sm"
                  >
                    -
                  </button>
                  <div className="w-1/6 flex justify-center items-center">{items.qty}</div>
                  <button
                    onClick={() => increaseCount({ ...items })}
                    className="bg-neutral-800 hover:bg-neutral-600 transition w-1/6 h-3/4 rounded hover:rounded-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
      </div>

      <div className="h-1/6 w-full flex justify-center items-center flex-col">
        <div>Shipping : {shippingPrice + " $"}</div>
        <div>Tax : {itemPrice == 0 ? 0 + "$" : taxPrice + " $"}</div>
        <div className="text-lg text-slate-800">
          Total :{loading ? "Loading..." : totalPrice + " $"}
        </div>
      </div>
    </div>
  );
}
