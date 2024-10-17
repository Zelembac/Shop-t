"use client";

import { useState, useEffect, Suspense } from "react";

import { DataFetch } from "../conponents/DataFetch";
import { ThreeCanvas } from "../conponents/ThreeCanvas";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { createClient } from "@supabase/supabase-js";

import Rating from "@mui/material/Rating";

export default function ItemPage({ params }: any) {
  const dispach = useDispatch();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const [rating, setRating] = useState(0);

  const [item, setItem] = useState<{
    name: string;
    price: number;
    rating: number;
    numberOfRatings: number;
  }>({ name: "", price: 0, rating: 0, numberOfRatings: 0 });

  useEffect(() => {
    const supabaseUrl = "https://tagpszeqcacjuyphkjjp.supabase.co";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey as string);
    async function getData() {
      let { data: Items1, error } = await supabase.from("Items").select("*").eq("id", params.id);
      const defaultItem = [{ name: "aaaaa", id: 12, price: 200, rating: 0, numberOfRatings: 0 }];
      setItem(Items1?.[0] || defaultItem);
    }
    getData();
    async function handleRating(rating: number, ratingCount: number, oldRating: number) {
      let finalRating = (rating * ratingCount + oldRating) / (ratingCount + 1);
      const { data, error } = await supabase
        .from("Items")
        .update({ rating: finalRating })
        .eq("id", params.id)
        .select();
      const { data: data2, error: error2 } = await supabase
        .from("Items")
        .update({ numberOfRatings: ratingCount + 1 })
        .eq("id", params.id)
        .select();
    }

    if (rating > 0) {
      console.log("doslo je");
      handleRating(rating, item.numberOfRatings, item.rating);
    }
  }, [rating]);

  return (
    <div className="flex items-center justify-items-center h-[84%] w-full flex-row bg-slate-500">
      <div
        className={
          show
            ? "w-full h-full greying absolute top-0 left-0 rounded z-50 flex items-center justify-center"
            : "w-full h-full greying absolute top-0 left-0 rounded z-50 hidden"
        }
        onClick={() => setShow(false)}
      >
        <div
          className="h-1/6 w-2/6 bg-slate-500 flex items-center justify-center flex-col rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            // Add any additional logic you want to execute when this button is clicked
          }}
        >
          <div className="w-full h-2/6 flex items-center justify-end p-2">
            <button
              onClick={() => setShow(false)}
              className="font-bold text-xl text-slate-500 bg-slate-100 rounded-3xl h-2/3 w-[7%]"
            >
              X
            </button>
          </div>
          <div className="w-full h-4/6 flex items-center justify-center">
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue ?? 0);
              }}
              size="large"
              precision={0.5}
            />
          </div>
        </div>
      </div>
      <div className="w-3/6  h-full rounded-lg ml-2 mt-4">
        <ThreeCanvas id={params.id}></ThreeCanvas>
      </div>
      <div className="w-3/6 bg-slate-700 h-full  flex items-center  justify-items-start flex-col">
        <div className="w-full h-1/6 bg-slate-500 text-2xl font-bold flex  flex-col items-start justify-center p-10">
          <h2>{item.name}</h2>
          <div
            onClick={() => setShow(true)}
            className="cursor-pointer flex items-center justify-center flex-row"
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Rating value={item.rating} readOnly precision={0.01}></Rating>
              <div className="text-xs font-light ml-2">{item.numberOfRatings} ratings</div>
            </Suspense>
          </div>
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
