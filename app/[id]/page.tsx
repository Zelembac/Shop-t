"use client";

import { useState, useEffect } from "react";

import { DataFetch } from "../conponents/DataFetch";
import { ThreeCanvas } from "../conponents/ThreeCanvas";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, { addToCart, hideLoading } from "../redux/slices/cartSlice";

export default function ItemPage({ params }: any) {
  const dispach = useDispatch();

  const { loading, cartItems } = useSelector((state: any) => state.cart);

  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});

  useEffect(() => {
    DataFetch().then((data) => {
      setItems(data);
      for (const i of data) {
        if (i.id == params.id) {
          setItem(i);
        }
      }
    });
  }, []);

  return (
    <div className="flex items-center justify-items-center h-[84%] w-full flex-row bg-white">
      <div className="w-3/6 bg-white h-full">
        <ThreeCanvas></ThreeCanvas>
      </div>
      <div className="w-3/6 bg-slate-700 h-full p-3 flex items-center justify-items-center flex-col">
        <h2 className="w-full h-1/6 bg-slate-900 text-2xl font-bold flex items-center justify-center text-center p-10">
          {item.name}
        </h2>
        <div className="w-full h-4/6 bg-slate-700 flex items-center justify-center p-10">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni debitis esse aperiam
          deleniti, atque, eligendi laudantium itaque quasi mollitia enim dolore velit assumenda
          ipsam, quis cum. Itaque fuga accusamus consequatur.
        </div>

        <div className="w-full h-1/6 bg-slate-900 flex items-center justify-center p-10">
          <div className="w-1/3 h-full flex items-center justify-center text-2xl">
            {item.price + " $"}
          </div>

          <button
            onClick={() => dispach(addToCart({ ...item, qty: 1 }))}
            className="bg-neutral-800 hover:bg-neutral-600 transition w-1/3 h-full"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
