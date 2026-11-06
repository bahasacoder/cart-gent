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
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={"/fake-shop"}>Shop</Link></li>
                    <li><Link href={"/fake-cart"}>Cart</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar