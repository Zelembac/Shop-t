"use client";
import Image from "next/image";

import Link from "next/link";
import icon from "../images/shopping-cart.png";
export default function CartIcon() {
  return (
    <div className="flex  items-center justify-center ">
      <Link href="/cart">
        <Image src={icon} width={60} height={60} alt="Picture of the author" />
      </Link>
    </div>
  );
}
