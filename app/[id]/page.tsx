"use client";

import { useState, useEffect } from "react";

import { DataFetch } from "../conponents/DataFetch";
import { ThreeCanvas } from "../conponents/ThreeCanvas";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

export default function ItemPage({ params }: any) {
  const dispach = useDispatch();

  const [count, setCount] = useState(1);

  const [item, setItem] = useState<{ name: string; price: number }>({ name: "", price: 0 });

  useEffect(() => {
    DataFetch().then((data) => {
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
        <ThreeCanvas id={params.id}></ThreeCanvas>
      </div>
      <div className="w-3/6 bg-slate-700 h-full  flex items-center justify-items-center flex-col">
        <h2 className="w-full h-1/6 bg-slate-900 text-2xl font-bold flex items-center justify-center text-center p-10">
          {item.name}
        </h2>
        <div className="w-full h-4/6 bg-slate-700 flex items-start justify-center p-10">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni debitis esse aperiam
          deleniti, atque, eligendi laudantium itaque quasi mollitia enim dolore velit assumenda
          ipsam, quis cum. Itaque fuga accusamus consequatur.
        </div>

        <div className="w-full h-1/6 bg-slate-900 flex items-center justify-between p-2">
          <div className="w-1/5 h-full flex items-center justify-center text-2xl">
            {item.price * count + " $"}
          </div>
          <div className="w-[30%] h-full flex justify-evenly items-center text-lg font-semibold">
            <button
              onClick={() => (count > 1 ? setCount(count - 1) : null)}
              className="bg-neutral-800 hover:bg-neutral-700 transition w-1/6 h-2/5 rounded hover:rounded-sm"
            >
              -
            </button>
            <div className="w-1/6 flex justify-center items-center">{count}</div>
            <button
              onClick={() => setCount(count + 1)}
              className="bg-neutral-800 hover:bg-neutral-700 transition w-1/6 h-2/5 rounded hover:rounded-sm"
            >
              +
            </button>
          </div>
          <div className="w-[50%] h-full flex justify-center items-center">
            <button
              onClick={() => dispach(addToCart({ ...item, qty: count }))}
              className="bg-neutral-800 hover:bg-neutral-600 hover:w-[55%] rounded hover:rounded-sm hover:h-4/5 transition w-2/4 h-3/5"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
