"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import searchIcon from "../images/search.png";
import { DataFetch } from "./DataFetch";
import { useDispatch } from "react-redux";
import { addToCart, hideLoading } from "../redux/slices/cartSlice";

export function Shoping() {
  const dispach = useDispatch();

  useEffect(() => {
    dispach(hideLoading());
  }, [dispach]);

  const [shopingItems, setShopingItems] = useState<[{ name: string; id: number; price: number }]>([
    { name: "aaaaa", id: 12, price: 200 },
  ]);

  const [filteredShopingList, setFilteredShopingList] = useState([...shopingItems]);
  const [filterOrder, setFilterOrder] = useState("A-Z");
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(1000);
  const [serch, setSerch] = useState("");

  useEffect(() => {
    DataFetch().then((data) => {
      setShopingItems(data);
      setFilteredShopingList(data);
    });
  }, []);

  function filter() {
    let unfilteredArray = [...shopingItems];
    let filteredArray = unfilteredArray.filter((items) =>
      items.name.toLowerCase().includes(serch.toLowerCase())
    );

    if (filterOrder == "lowToHigh") {
      filteredArray.sort((a, b) => a.price - b.price);
    }

    if (filterOrder == "highToLow") {
      filteredArray.sort((a, b) => b.price - a.price);
    }

    if (filterOrder == "A-Z") {
      filteredArray.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    if (filterOrder == "Z-A") {
      filteredArray.sort((a, b) => (b.name > a.name ? 1 : -1));
    }

    let filteredArrayF = filteredArray.filter(
      (item) => item.price > lowestPrice && item.price < highestPrice
    );

    setFilteredShopingList(filteredArrayF);
  }

  return (
    <div className=" h-full w-full flex justify-center items-center flex-col">
      <div className="h-[10%] w-full flex justify-between items-center p-3 bg-zinc-600">
        <div className="flex justify-start items-center  w-1/2 h-full">
          <div className="w-1/3 h-full flex justify-evenly items-center">
            <label htmlFor="filterObject">Sort by</label>
            <select
              id="filterObject"
              className=" h-1/3 text-slate-800 focus:bg-slate-500 focus:rounded focus:h-1/2  hover:bg-slate-500 border-none rounded-xl hover:rounded hover:h-1/2 transition-all"
              value={filterOrder}
              onChange={(e) => setFilterOrder(e.target.value)}
            >
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>

          <div className="flex items-center justify-center flex-col">
            <label htmlFor="min">lowest price</label>
            <input
              type="range"
              name="minRange"
              id="min"
              max={1000}
              value={lowestPrice}
              onChange={(e) => setLowestPrice(parseInt(e.target.value))}
            />
            <div>{lowestPrice}</div>
          </div>

          <div className="flex items-center justify-center flex-col">
            <label htmlFor="max">highest price</label>
            <input
              type="range"
              name="maxRange"
              id="max"
              max={1000}
              value={highestPrice}
              onChange={(e) => setHighestPrice(parseInt(e.target.value))}
            />
            <div>{highestPrice}</div>
          </div>
        </div>

        <div className=" w-1/5 h-full flex justify-evenly items-center  text-slate-900">
          <input
            type="search"
            name="searchShop"
            id="searchShop"
            value={serch}
            onChange={(e) => setSerch(e.target.value)}
            className="h-1/2 hover:h-2/3 focus:h-2/3 transition-all rounded-lg hover:rounded focus:rounded  hover:bg-slate-500 focus:bg-slate-500"
          />
          <button
            className="bg-white hover:bg-slate-500  rounded-3xl hover:rounded transition-all"
            onClick={filter}
          >
            <Image src={searchIcon} width={40} height={40} alt="Search icon" />
          </button>
        </div>
      </div>
      <div className="h-[90%] w-full flex justify-start items-start flex-wrap bg-slate-500">
        {filteredShopingList.map((items) => (
          <div
            key={items.id}
            className="bg-white w-1/6 h-2/6  transition-all m-5 flex justify-center items-center flex-col hover:items-hover rounded"
          >
            <Link href={"/" + items.id} className="w-full h-4/5 flex items-center justify-center">
              <Image
                src={"/" + items.id + ".jpg"}
                width={220}
                height={220}
                alt="Search icon"
              ></Image>
            </Link>
            {/* <ThreeCanvas></ThreeCanvas> */}
            <div className="w-full h-1/5 bg-zinc-700 flex justify-center items-center  p-1">
              <div className="w-1/3 h-full flex justify-center items-center flex-col">
                <h2 className="w-full h-1/2">{items.name}</h2>
                <div className="w-full h-1/2">{items.price}$</div>
              </div>
              <div className="w-2/3 h-full flex justify-center items-center">
                <button
                  onClick={() => dispach(addToCart({ ...items, qty: 1 }))}
                  className="bg-neutral-800 hover:bg-neutral-600 transition w-3/5 h-3/5 hover:h-4/5 hover:w-3/4  rounded hover:rounded-sm"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
