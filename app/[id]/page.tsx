"use client";

import { useState, useEffect } from "react";

import { DataFetch } from "../conponents/DataFetch";
import { ThreeCanvas } from "../conponents/ThreeCanvas";

export default function ItemPage({ params }: any) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    DataFetch().then((data) => {
      setItems(data);
    });
  }, []);

  return (
    <div className="flex items-center justify-items-center h-[84%] w-full flex-row bg-white">
      <div className="w-3/6 bg-white h-full">
        <ThreeCanvas></ThreeCanvas>
      </div>
      <div className="w-3/6 bg-slate-700 h-full p-3 flex items-center justify-items-center flex-col">
        <h2>LAALALLALAasd</h2>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni debitis esse aperiam
          deleniti, atque, eligendi laudantium itaque quasi mollitia enim dolore velit assumenda
          ipsam, quis cum. Itaque fuga accusamus consequatur.
        </div>

        <div>{params.id}</div>
      </div>
    </div>
  );
}
