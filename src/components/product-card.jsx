import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard(props){
    const product = props.product;
    const [isHovered, setIsHovered] = useState(false);
    
    return(
        <div className="bg-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col m-0">
            {/* Image Container */}
            <div 
                className="relative w-full h-40 bg-gray-100 flex items-center justify-center p-3"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img 
                    src={product.images[0]} 
                    alt={product.pName} 
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 absolute" 
                    style={{ opacity: isHovered ? 0 : 1, transition: 'opacity 500ms' }}
                />
                <img 
                    src={product.images[1]} 
                    alt={product.pName} 
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 absolute" 
                    style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 500ms' }}
                />

                {product.isAvailable ? (
                    <span className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded" style={{backgroundColor: '#e29816'}}>In Stock</span>
                ) : (
                    <span className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded" style={{backgroundColor: '#dc2626'}}>Out of Stock</span>
                )}
            </div>
            
            {/* Content Container */}
            <div className="p-2.5 flex flex-col">
                
                {/* Product Name */}
                <h3 className="text-sm font-semibold mb-1 line-clamp-1" style={{color: '#111827'}}>
                    {product.pName}
                </h3>
                
                {/* Description */}
                <p className="text-xs mb-2 line-clamp-1" style={{color: '#6b7280'}}>
                    {product.pDescription}
                </p>
                
                {/* Price & Action */}
                <div className="flex flex-col gap-1.5 mt-auto">
                    <div className="flex flex-col">
                        <p className="text-lg font-bold" style={{color: '#111827'}}>LKR {product.price}</p>
                        {product.lebalPrice && product.lebalPrice > product.price && (
                            <p className="text-xs font-semibold line-through" style={{color: '#6b7280'}}>LKR {product.lebalPrice}</p>
                        )}
                    </div>
                    <div className="flex gap-1.5">
                        <button 
                            className="text-white px-3 py-1.5 rounded-lg transition-colors duration-200 whitespace-nowrap text-xs" 
                            style={{backgroundColor: '#27302b', width: '60%'}} 
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#e29816'} 
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#27302b'}
                        >
                            Add to Cart
                        </button>
                        <Link to={`/overview/${product.productID}`} 
                            className="text-white px-2 py-1.5 rounded-lg transition-colors duration-200 text-xs" 
                            style={{backgroundColor: '#27302b', width: '40%'}} 
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#e29816'} 
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#27302b'}
                        >
                            view details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}