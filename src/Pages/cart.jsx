import { useState } from "react";
import { BsChevronBarUp, BsChevronBarDown } from "react-icons/bs";
import { addItemToCart } from "../utils/cart";
import { getCartItems } from "../utils/cart.js";
import { getTotalCartItems } from "../utils/cart";
import { Link } from "react-router-dom";

export default function Cartpage() {
    const [cartItems, setCartItems] = useState(getCartItems());
    
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-primary to-gray-50 flex flex-col items-center px-4 py-8">
        
        {/* Header Section */}
        <div className="w-full max-w-5xl mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>

        {/* Cart Items Section */}
        <div className="w-full max-w-5xl space-y-4 mb-8">
          {cartItems.map((item, index) => (
            <div 
              className=" flex w-full bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-200" 
              key={index}
            >
              {/* Product Image */}
              <div className="relative w-32 h-32 bg-gray-100 flex-shrink-0">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover"
                  alt={item.name}
                />
              </div>
              
              {/* Product Details */}
              <div className="flex flex-col justify-center flex-grow px-6 py-4">
                <h1 className=" lg:text-xl font-bold text-secondary mb-2 relative group cursor-pointer">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs absolute -top-8 left-0 bg-accent text-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-10">
                    {item.name}
                  </span>
                  {item.name.length > 25 ? item.name.substring(0, 25) + "..." : item.name}
                </h1>
                
                {/* Price Section */}
                <div className="flex items-center gap-3 mb-3">
                  {item.lebalPrice > item.price && (
                    <span className="text-sm text-gray-400 line-through">
                      LKR {item.lebalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-gold">
                    LKR {item.price.toFixed(2)}
                  </span>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 font-medium">Quantity:</span>
                  <div className="flex items-center gap-1 bg-accent text-white px-3 py-1.5 rounded-full shadow-md">
                    <button className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all">
                      <BsChevronBarUp
                        onClick={() => {
                          addItemToCart(item, 1);
                          const updatedCart = getCartItems();
                          setCartItems(updatedCart);
                        }}
                        className="text-base" 
                      />
                    </button>
                    <span className="text-base font-semibold min-w-[30px] text-center">
                      {item.quantity}
                    </span>
                    <button className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all">
                      <BsChevronBarDown
                        onClick={() => {
                          addItemToCart(item, -1);
                          const updatedCart = getCartItems();
                          setCartItems(updatedCart);
                        }}
                        className="text-base" 
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Subtotal Section */}
              <div className="hidden lg:flex items-center justify-center px-8 border-l border-gray-200 bg-gray-50">
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Subtotal</p>
                  <p className="text-2xl font-bold text-secondary">
                    LKR {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Cart Message */}
        {cartItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-3xl font-semibold text-gray-400 mb-3">Your cart is empty</p>
            <p className="text-gray-500 text-lg">Add some items to get started!</p>
          </div>
        )}

        {/* Checkout Section */}
        {cartItems.length > 0 && (
          <div className="  lg: w-full max-w-5xl mt-6">
            <div className="w-full lg: flex items-center justify-between bg-accent text-white px-8 py-4 rounded-2xl shadow-lg">
              <div className="flex flex-col">
                <span className="text-sm uppercase tracking-wide opacity-90">Total Amount</span>
                <span className="text-3xl font-bold">LKR {getTotalCartItems().toFixed(2)}</span>
              </div>
              <Link 
                to="/checkout" 
                className=" lg: bg-gold text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-xl transform hover:scale-105"
                state={cartItems}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}

      </div>
    );
}