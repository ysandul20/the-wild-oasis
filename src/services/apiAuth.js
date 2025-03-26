import supabase from "./supabase";

export async function userSignUp({ fullName, email, password }) {
   const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
         data: {
            fullName,
            avatar: "",
         },
      },
   });
   if (error) throw new Error(error.message);
   console.log(data);
   return data;
}
export async function userSignIn({ email, password }) {
   const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
   });
   if (error) throw new Error(error.message);
   console.log(data);
   return data;
}

export async function getCurrentUser() {
   const { data: session } = await supabase.auth.getSession();
   if (!session.session) return;
   // if (!session.session) return null;

   const { data } = await supabase.auth.getUser();
   // console.log("getCurrentUser", data.user);
   return data.user;
}

export async function logoutUser() {
   const { error } = await supabase.auth.signOut();
   if (error) throw new Error(error.message);
}

export async function updateUserData({ password, fullName, avatar }) {
   console.log("updateUserData", password, fullName, avatar);
   //TODO: 1. Update 'password' OR 'fullname + avatar'
   let updateData;
   if (password) updateData = { password };
   if (fullName) updateData = { data: { fullName } };

   const { data, error } = await supabase.auth.updateUser(updateData);
   if (error) throw new Error(error.message);
   console.log("avatar", avatar);
   if (!avatar) return data;

   //TODO: 2. Upload avatar image
   // console.log(avatar.name);
   const fileName = `avatar-${data.user.id}-${avatar.name}`;
   // const fileName = `avatar-${data.user.id}`;
   // console.log(fileName);
   const { errorUploadFile } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar, { upsert: true });
   if (errorUploadFile) throw new Error(errorUploadFile.message);

   //TODO: 3. Update user avatar image
   const { data2: updatedUser, error2 } = await supabase.auth.updateUser({
      data: {
         avatar: `https://reisybnxlrxzfcsdkusy.supabase.co/storage/v1/object/public/avatars//${fileName}`,
      },
   });
   if (error2) throw new Error(error2.message);
   return updatedUser;
   // return data;
}
