import {createClient} from "@supabase/supabase-js"


const url = "https://xkzrgkteiayjvsejztpp.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrenJna3RlaWF5anZzZWp6dHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MDE0MDAsImV4cCI6MjA4Mzk3NzQwMH0.oQvY-HnF7DuW5HVm0SKLFeZkHuh2VYtxhg9HCZSlu4o"

const supabase = createClient(url, key)

export  function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const timeStamp = Date.now();
    const fileName = timeStamp + "_" + file.name;

    if (!file) {
      console.warn("No file selected");
      resolve(null);
      return;
    }

    supabase.storage
      .from("images")
      .upload(fileName, file, {  // ← Use fileName, not file.name
        cacheControl: '3600',
        upsert: false
      })
      .then(({ data, error }) => {  // ← Fixed: proper destructuring
        if (error) {
          console.error("Upload error:", error);
          reject("Upload failed: " + error.message);
          return;
        }
        const publicURL = supabase.storage
          .from("images")
          .getPublicUrl(fileName).data.publicUrl;  // ← Use fileName
        resolve( publicURL);
      })
      .catch((error) => {
        reject("Upload failed: " + error.message);
      });
  });
}