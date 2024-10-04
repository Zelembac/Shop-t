"use client";
import { useState, useEffect } from "react";
import { ThreeCanvas } from "./ThreeCanvas";
import Link from "next/link";
import Image from "next/image";
import searchIcon from "../images/search.png";
import { DataFetch } from "./DataFetch";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, { addToCart, hideLoading } from "../redux/slices/cartSlice";

export function Shoping() {
  const dispach = useDispatch();

  const { loading, cartItems } = useSelector((state: any) => state.cart);

  useEffect(() => {
    dispach(hideLoading());
  }, [dispach]);

  const [shopingIntems, setShopingItems] = useState([{ name: "aaaaa", id: 12, price: 200 }]);

  const [filteredShopingList, setFilteredShopingList] = useState([...shopingIntems]);
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
    let unfilteredArray = [...shopingIntems];
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
        <div className="flex">asd</div>

        <select
          id="filterObject"
          className=" text-cyan-900"
          value={filterOrder}
          onChange={(e) => setFilterOrder(e.target.value)}
        >
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
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

        <div className=" w-1/5 flex justify-evenly items-center text-cyan-950 ">
          <input
            type="search"
            name="searchShop"
            id="searchShop"
            value={serch}
            onChange={(e) => setSerch(e.target.value)}
          />
          <button
            className="bg-white hover:bg-slate-500  rounded-3xl hover:rounded transition-all"
            onClick={filter}
          >
            <Image src={searchIcon} width={40} height={40} alt="Picture of the author" />
          </button>
        </div>
      </div>
      <div className="h-[90%] w-full flex justify-start items-start flex-wrap">
        {filteredShopingList.map((items) => (
          <div
            key={items.id}
            className="bg-white w-1/6 h-2/6 m-5 flex justify-center items-center flex-col"
          >
            <Link href={"/" + items.id} className="w-full h-4/5"></Link>
            {/* <ThreeCanvas></ThreeCanvas> */}
            <div className="w-full h-1/5 bg-zinc-700 flex justify-center items-center  p-1">
              <div className="w-1/3 h-full flex justify-center items-center flex-col">
                <h2 className="w-full h-1/2">{items.name}</h2>
                <div className="w-full h-1/2">{items.price}$</div>
              </div>
              <div className="w-2/3 h-full flex justify-center items-center">
                <button
                  onClick={() => dispach(addToCart({ ...items, qty: 1 }))}
                  className="bg-neutral-800 hover:bg-neutral-600 transition w-1/3 h-full"
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
