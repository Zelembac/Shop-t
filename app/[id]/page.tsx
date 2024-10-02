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
    <div className="flex items-center justify-items-center h-[84%] w-full flex-col bg-white">
      <ThreeCanvas></ThreeCanvas>
    </div>
  );
}
