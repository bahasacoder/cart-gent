///app/app/cart/page.js
'use client';

import { useDispatch, useSelector } from 'react-redux'; 
import { store } from "@/lib/store";
import { removeFromCart, updateQuantity, clearCart } from '@/lib/features/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartShop() {
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id) => {
    dispatch(updateQuantity({ id, type: 'increment' }));
  };

  const handleDecrement = (id) => {
    dispatch(updateQuantity({ id, type: 'decrement' }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">ShopHub</h1>
          </div>
          <Link href="/fake-shop">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Shopping Cart</h2>
            <p className="text-muted-foreground">
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleClearCart}
              className="hidden sm:flex"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <Card className="py-16">
            <CardContent className="flex flex-col items-center justify-center space-y-4">
              <ShoppingBag className="h-24 w-24 text-muted-foreground/50" />
              <h3 className="text-2xl font-semibold">Your cart is empty</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <Link href="/">
                <Button size="lg" className="mt-4">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          ${item.price} each
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDecrement(item.id)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleIncrement(item.id)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">
                              ${item.totalPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Mobile Clear Cart Button */}
              <Button
                variant="destructive"
                onClick={handleClearCart}
                className="w-full sm:hidden"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-semibold">${(totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${(totalAmount * 1.1).toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Link href="/fake-shop" className="w-full">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 ShopHub. Built with Redux Toolkit & Next.js</p>
        </div>
      </footer>
    </div>
  );
}
