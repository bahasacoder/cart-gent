// /app/app/page.js
'use client'

import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '@/lib/features/cartSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag, X } from 'lucide-react'
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks'

interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}


const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    description: 'Premium noise-cancelling wireless headphones',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    description: 'Feature-rich smartwatch with health tracking',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    description: 'Durable backpack with laptop compartment',
    category: 'Accessories'
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    description: 'RGB mechanical keyboard for gaming',
    category: 'Electronics'
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    description: 'Ergonomic wireless mouse',
    category: 'Electronics'
  },
  {
    id: '6',
    name: 'USB-C Hub',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    description: 'Multi-port USB-C hub adapter',
    category: 'Accessories'
  },
  {
    id: '7',
    name: 'Phone Stand',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
    description: 'Adjustable phone stand for desk',
    category: 'Accessories'
  },
  {
    id: '8',
    name: 'Webcam HD',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?w=500&h=500&fit=crop',
    description: '1080p HD webcam for video calls',
    category: 'Electronics'
  }
]

export default function App() {
   // Initialize the store with the product information
  const store = useAppStore()
  const initialized = useRef(false)
  
  const [isCartOpen, setIsCartOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { items, totalQuantity, totalAmount } = useAppSelector((state) => state.cart)

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product))
  }

  const handleRemoveFromCart = (id:any) => {
    dispatch(removeFromCart(id))
  }

  const handleIncreaseQuantity = (id: any) => {
    dispatch(increaseQuantity(id))
  }

  const handleDecreaseQuantity = (id: any) => {
    dispatch(decreaseQuantity(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-slate-900">TechShop</h1>
            </div>
            
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="relative">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                  {totalQuantity > 0 && (
                    <Badge className="ml-2 px-2 py-0.5 text-xs">
                      {totalQuantity}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    <span>Shopping Cart ({totalQuantity})</span>
                    {items.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearCart}
                        className="text-destructive hover:text-destructive"
                      >
                        Clear All
                      </Button>
                    )}
                  </SheetTitle>
                  <SheetDescription>
                    Review your items and proceed to checkout
                  </SheetDescription>
                </SheetHeader>

                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <ShoppingCart className="h-24 w-24 text-muted-foreground/20" />
                    <p className="mt-4 text-lg font-medium text-muted-foreground">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Add some products to get started!
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <ScrollArea className="flex-1 pr-4 mt-6">
                      <div className="space-y-4">
                        {items.map((item) => (
                          <Card key={item.id}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-20 w-20 rounded-md object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h4 className="font-semibold text-sm">{item.name}</h4>
                                      <p className="text-sm font-medium text-primary mt-1">
                                        ${item.price.toFixed(2)}
                                      </p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-destructive hover:text-destructive"
                                      onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 mt-3">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleDecreaseQuantity(item.id)}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-12 text-center font-medium">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleIncreaseQuantity(item.id)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                    <span className="ml-auto font-semibold text-sm">
                                      ${item.totalPrice.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>

                    <Separator className="my-4" />
                    
                    <div className="space-y-4 pb-4">
                      <div className="flex items-center justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-primary">${totalAmount.toFixed(2)}</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Products</h2>
          <p className="text-muted-foreground">Discover our curated collection of tech products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => {
            const cartItem = items.find(item => item.id === product.id)
            const isInCart = !!cartItem

            return (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3">
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-1">{product.name}</CardTitle>
                  <CardDescription className="text-sm mb-3">
                    {product.description}
                  </CardDescription>
                  <p className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  {isInCart ? (
                    <div className="flex items-center gap-2 w-full">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDecreaseQuantity(product.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="flex-1 text-center font-semibold">
                        {cartItem.quantity} in cart
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleIncreaseQuantity(product.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built with Next.js, Redux Toolkit, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
