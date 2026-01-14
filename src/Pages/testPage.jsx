 import { useState } from "react";
 import{uploadFile} from "../utils/mediaUpload"
 
 

export  function TestPage() {

  
  const [file, setFile] = useState(null);
   async function handleUpload() {
    
      const url  = await uploadFile(file)
      console.log(url);

    
  }
  
  return (
   
    
    <div className="w-full h-full flex justify-center items-center">
      <input type="file" onChange={(e)=> {
        setFile(e.target.files[0]);

      }} />
      <button onClick={handleUpload} className="bg-red-500 text-white rounded-2xl">Upload</button>
    </div>
    
  );
}
