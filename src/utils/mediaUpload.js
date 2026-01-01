import { createClient } from "@supabase/supabase-js";

const url = "https://tcchntycwmjtmlvcmdte.supabase.co";
const key =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjY2hudHljd21qdG1sdmNtZHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNjg0MTIsImV4cCI6MjA4Mjc0NDQxMn0.TfM5kHupJ0cwRu8wTkjAr1tKM1oX_Jb57bleqIA0Eck";

const supabase = createClient(url, key);

export default function uploadFile(file) {
   return new Promise((resolve, reject) => {
      const timeStamp = Date.now();
      const fileName = timeStamp + "_" + file.name;
      supabase.storage
         .from("images")
         .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
         })
         .then(() => {
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl);
         })
         .catch((error) => {
            reject(error);
         });
   });
}
