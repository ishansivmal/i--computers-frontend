import { useState, useEffect } from "react";
import { BsChevronBarUp, BsChevronBarDown } from "react-icons/bs";

import { getTotalCartItems } from "../utils/cart";
import { useLocation, useNavigate } from "react-router-dom";


export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState(() => {
        console.log("Initializing cartItems with location.state:", location.state);
        console.log("Type of location.state:", typeof location.state);
        console.log("Is Array?:", Array.isArray(location.state));
        
        if (!location.state) {
            return [];
        }
        
        // If it's already an array, use it
        if (Array.isArray(location.state)) {
            console.log("location.state is array, using directly");
            console.log("First item in array:", location.state[0]);
            return location.state;
        }
        
        // If it's an object, wrap it in an array
        console.log("location.state is object, wrapping in array");
        const wrapped = [location.state];
        console.log("Wrapped result:", wrapped);
        return wrapped;
    });

    useEffect(() => {
        if (location.state == null) {
            navigate("/products");
        }
    }, [location.state, navigate]);

    function getCartTotal() {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    // Safety check - make sure cartItems is always an array
    console.log("Before render - cartItems:", cartItems, "Is array?", Array.isArray(cartItems));
    
    if (!Array.isArray(cartItems)) {
        console.error("ERROR: cartItems is not an array! Converting now...");
        setCartItems([cartItems]);
        return null;
    }
    
    if (cartItems.length === 0) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-primary to-gray-50 flex flex-col items-center justify-center px-4 py-8">
                <div className="text-center py-20">
                    <p className="text-3xl font-semibold text-gray-400 mb-3">Your cart is empty</p>
                    <p className="text-gray-500 text-lg">Add some items to get started!</p>
                </div>
            </div>
        );
    }
    
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-primary to-gray-50 flex flex-col items-center px-4 py-8">
        
        {/* Header Section */}
        <div className="w-full max-w-5xl mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-2">Checkout</h1>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>

        {/* Cart Items Section */}
        <div className="w-full max-w-5xl space-y-4 mb-8">
          {cartItems.map((item, index) => (
            <div 
              className="flex w-full bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-200" 
              key={index}
            >
              {/* Product Image */}
              <div className="relative w-32 h-32 bg-gray-100 flex-shrink-0">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover"
                  alt={item.pName || item.name || 'Product'}
                />
              </div>
              
              {/* Product Details */}
              <div className="flex flex-col justify-center flex-grow px-6 py-4">
                <h1 className="text-xl font-bold text-secondary mb-2 relative group cursor-pointer">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs absolute -top-8 left-0 bg-accent text-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-10">
                    {item.pName || item.name || 'Product'}
                  </span>
                  {(item.pName || item.name || 'Product').length > 25 ? (item.pName || item.name || 'Product').substring(0, 25) + "..." : (item.pName || item.name || 'Product')}
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
                            const copyCart = [...cartItems];
                            copyCart[index].quantity += 1;
                            setCartItems(copyCart);
                          
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
                            const copyCart = [...cartItems]
                            copyCart[index].quantity -= 1;
                            if (copyCart[index].quantity <= 0) {
                                copyCart.splice(index, 1);
                            }
                            setCartItems(copyCart);
                        }}
                        className="text-base" 
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Subtotal Section */}
              <div className="flex items-center justify-center px-8 border-l border-gray-200 bg-gray-50">
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

        {/* Checkout Section */}
        {cartItems.length > 0 && (
          <div className="w-full max-w-5xl mt-6">
            <div className="flex items-center justify-between bg-accent text-white px-8 py-4 rounded-2xl shadow-lg">
              <div className="flex flex-col">
                <span className="text-sm uppercase tracking-wide opacity-90">Total Amount</span>
                <span className="text-3xl font-bold">LKR {getCartTotal().toFixed(2)}</span>
              </div>
              <button className="bg-gold text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-xl transform hover:scale-105">
                Order Now
              </button>
            </div>
          </div>
        )}

      </div>
    );
}