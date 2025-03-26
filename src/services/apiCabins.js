import supabase from "./supabase";

export async function getCabins() {
   const { data, error } = await supabase.from("cabins").select("*");
   if (error) throw new Error("Cabins could not be loaded");
   return data;
}
export async function deleteCabin(id) {
   const { data, error } = await supabase.from("cabins").delete().eq("id", id);
   if (error) throw new Error("Could not delete a cabin");
   return data;
}

export async function updateCabin(formData) {
   const filePath = formData.image;
   let fileName;

   if (typeof formData.image === "string") {
      const lastSlashIndex = filePath.lastIndexOf("/");
      fileName = filePath.slice(lastSlashIndex + 1);
   }

   if (typeof formData.image === "object") {
      const file = formData.image[0];
      const fileExt = file.name.split(".").pop();
      fileName = `${Date.now()}.${fileExt}`;

      //TODO: Add image file to supabase storage
      const { error: fileError } = await supabase.storage
         .from("cabin-images")
         .upload(fileName, file, {
            upsert: true,
         });
      if (fileError) throw new Error("Could not upload file");
   }
   // console.log("filename", fileName);

   // const imagePathFunc = getImagePath(fileName);
   // console.log("imagePathFunc", imagePathFunc);

   //TODO: Create image url (НЕ аcинхронно!)
   const { data: imagePath } = supabase.storage
      .from("cabin-images")
      .getPublicUrl(fileName);
   console.log(imagePath);

   const { data, error } = await supabase
      .from("cabins")
      .update({ ...formData, image: imagePath.publicUrl })
      .eq("id", formData.id)
      .select();
   if (error) throw new Error("Could not update a cabin");
   console.log(data);
   return data;
}

export async function createCabin(formData) {
   let fileName = "image-default.jpg";
   if (typeof formData.image === "string") {
      console.log("Now string");
      const filePath = formData.image;
      // console.log("filePath beforer", filePath);
      const lastSlashIndex = filePath.lastIndexOf("/");
      fileName = filePath.slice(lastSlashIndex + 1);
      // console.log(fileName);
   }
   if (typeof formData.image !== "string" && formData.image.length !== 0) {
      const file = formData.image[0];
      const fileExt = file.name.split(".").pop();
      fileName = `${Date.now()}.${fileExt}`;

      //TODO: Add image file to supabase storage
      const { error: fileError } = await supabase.storage
         .from("cabin-images")
         .upload(fileName, file, {
            upsert: true,
         });
      if (fileError) throw new Error("Could not upload file");
   }

   //TODO: Get image file url from supabase storage
   const { data: filePath } = supabase.storage
      .from("cabin-images")
      .getPublicUrl(fileName);
   console.log("filePath after", filePath);

   //TODO: Add row with all form data and image file link to supabase table
   const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...formData, image: filePath.publicUrl }])
      .select();
   if (error) throw new Error("Could not create a cabin");
   return data;
}

//TODO: HELPERS
function getImagePath(fileName) {
   //TODO: Get image file url from supabase storage
   /*
   - getPublicUrl() — синхронний метод, бо просто формує URL, не звертаючись до сервера.
   - getPublicUrl(fileName) не повертає об’єкт { data, error }.
   - Цей метод просто формує URL локально і повертає рядок (string) у полі data.
   - Поле error тут безглузде, бо помилка може виникнути тільки, якщо ви передасте некоректний fileName, а не через запит до сервера.
   */
   const { data: imagePath } = supabase.storage
      .from("cabin-images")
      .getPublicUrl(fileName);
   // console.log(imagePath);
   return imagePath.publicUrl;
}
