import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

function Navbar() {
    // const cartItems=useSelector(state=>console.log(state.cart.items))
    return (
        <header>
            <nav>
                <div>
                    <h1>Shopping Cart</h1>
                </div>
                <ul>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                                        <li><Link href={"/"}>Home</Link></li>
                                        <li><Link href={"/fake-cart"}>Cart</Link></li>
                                        <li><Link href={"/fake-shop"}>Shop</Link></li>
                        </div>
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar