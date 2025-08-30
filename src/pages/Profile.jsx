import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import imageCompression from "browser-image-compression";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || "/profile.png"
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Compress the image before converting to base64
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 512,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicture(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (err) {
        console.error(err);
        alert("Image compression failed.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      console.log(name, email);
      await updateUser({
        name,
        email,
        profilePicture,
      });
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white dark:bg-black rounded-xl shadow-lg dark:shadow-white/20 dark:text-white p-8">
      <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">
        Profile
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-2">
          <img
            src={profilePicture}
            alt="ProfilePicture"
            className="h-32 w-32 rounded-full object-cover shadow"
          />
          <label className="cursor-pointer text-green-600 hover:underline text-sm">
            Change Profile Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        {message && (
          <div className="text-center text-green-600 font-medium mt-2">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
