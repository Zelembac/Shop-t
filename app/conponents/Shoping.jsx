'use client'
import { useState } from "react";
import { ThreeCanvas } from "./ThreeCanvas";



export function Shoping() {
    const [shopingIntems,setShopingItems]=useState([{name:'a',id:12},{name:'b',id:23}]);

  return (
    <div className=" h-full w-full ">
       {shopingIntems.map(items=>
      
            <div key={items.id} className="bg-white w-1/5 h-1/6 m-5 flex justify-center items-center">
               <ThreeCanvas></ThreeCanvas>
            </div>
        
       )}
 
    </div>
  );
}