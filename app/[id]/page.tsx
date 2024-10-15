"use client";

import { useState, useEffect } from "react";

import { DataFetch } from "../conponents/DataFetch";
import { ThreeCanvas } from "../conponents/ThreeCanvas";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { Rating } from "react-simple-star-rating";

export default function ItemPage({ params }: any) {
  const dispach = useDispatch();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const [rating, setRating] = useState(0);

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

  const handleRating = (rate: number) => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) => console.log(value, index);

  return (
    <div className="flex items-center justify-items-center h-[84%] w-full flex-row bg-slate-500">
      <button
        className={
          show
            ? "w-full h-full greying absolute top-0 left-0 rounded z-50 flex items-center justify-center"
            : "w-full h-full greying absolute top-0 left-0 rounded z-50 hidden"
        }
        onClick={() => setShow(false)}
      >
        <div
          className="h-2/6 w-2/6 bg-slate-500 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            // Add any additional logic you want to execute when this button is clicked
          }}
        >
          <Rating
            onClick={handleRating}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
            /* Available Props */
          />
        </div>
      </button>
      <div className="w-3/6  h-full rounded-lg ml-2 mt-4">
        <ThreeCanvas id={params.id}></ThreeCanvas>
      </div>
      <div className="w-3/6 bg-slate-700 h-full  flex items-center  justify-items-start flex-col">
        <div className="w-full h-1/6 bg-slate-500 text-2xl font-bold flex  flex-col items-start justify-center p-10">
          <h2>{item.name}</h2>
          <button className="w-1/5 h-1/3 bg-slate-700" onClick={() => setShow(true)}>
            {/* Add descriptive text or aria-label here */}
          </button>
        </div>

        <div className="w-full h-4/6 bg-slate-500 flex items-start justify-center p-10">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni debitis esse aperiam
          deleniti, atque, eligendi laudantium itaque quasi mollitia enim dolore velit assumenda
          ipsam, quis cum. Itaque fuga accusamus consequatur.
        </div>

        <div className="w-full h-1/6 bg-slate-500 flex items-center justify-between p-2 short-border">
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
