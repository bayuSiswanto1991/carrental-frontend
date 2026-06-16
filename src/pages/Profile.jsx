import React from "react";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser, token, backendUrl } = useContext(AppContext);

  const [image, setImage] = useState(null);
  const [name, setName] = useState(user?.name || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    const res = await fetch(`${backendUrl}/api/auth/profile`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      toast.success("Profil berhasil diupdate! ✅");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className=" min-h-screen px-6 md:px-16 bg-gray-50 py-10">
      <div className=" max-w-md mx-auto bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h1 className=" text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className=" flex flex-col gap-5">
          {/* FOTO PROFILE */}
          <div className=" flex flex-col items-center gap-3">
            <img src={image ? URL.createObjectURL(image) : user?.image || assets.user_profile} alt="" className=" w-24 h-24 rounded-full object-cover border-2 border-gray-200" />
            <label className=" text-xs text-primary cursor-pointer hover:underline">
              Ganti Foto
              <input type="file" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
          </div>

          {/* NAMA */}
          <div>
            <label className=" text-xs text-gray-600 mb-1 block">Nama</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className=" w-full border border-gray-200 rounded-lg px-3 py-4 outline-none" required />
          </div>

          {/* EMAIL - readonly */}
          <div>
            <label className=" text-xs text-gray-600 mb-1 block">Email</label>
            <input type="email" value={user?.email || ""} className="w-full border border-gray-200 rounded-lg px-3 py-4 outline-none" disabled />
          </div>

          <button type="submit" className=" bg-primary text-white py-3 rounded-lg hover:opacity-90 transition">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
