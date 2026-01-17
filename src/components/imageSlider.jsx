import { useState } from "react";

export default function ImageSlider(props) {
    const images = props.images;
    const [activeindex, setActiveIndex] = useState(0);
    
    return (
        <div className="w-full h-full flex flex-col items-center justify-between py-4">
            <img 
                src={images[activeindex]} 
                alt="" 
                className="w-full h-[calc(100%-120px)] object-contain rounded-lg" 
            />

            <div className="w-full h-[100px] flex flex-row justify-center items-center gap-4">
                {images.map((image, index) => (
                    <img 
                        key={index}
                        src={image} 
                        alt={`Thumbnail ${index}`}
                        className={
                            "w-[90px] h-[90px] object-cover rounded-lg cursor-pointer transition-all duration-200 hover:scale-105" +
                            ((activeindex === index) 
                                ? " border-4 border-accent shadow-lg" 
                                : " border-2 border-gray-200 opacity-70 hover:opacity-100")
                        }
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}