import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../app/store";
import * as Icon from "react-feather";
import { toast } from "react-toastify";
import { ISignoutResponse } from "../interfaces/IApiTypes";
import { signout } from "../api/authApi";
import { setUser } from "../features/auth/authSlice";
import { validateImage } from "../configs/fileValidations";
import { supabase } from "../configs/supabase";
import { updateUser } from "../api/userApi";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.layout);
  const [imgLoader, setImgLoader] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    profilePicture: string;
  }>({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    profilePicture: user?.profilePicture || "",
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgLoader(true);
    const file = e.target.files?.[0];
    if (file) {
      const { success, message } = validateImage(file);
      if (!success) {
        toast.error(message);
        setImgLoader(false);
        return;
      }
      const fileName = new Date().getTime() + file.name;
      const { data, error } = await supabase.storage
        .from("dev-app-bucket")
        .upload(`uploads/images/${fileName}`, file, {
          upsert: false,
        });
      if (data) {
        setFormData({
          ...formData,
          ["profilePicture"]:
            import.meta.env.VITE_SUPABASE_URL +
            "/storage/v1/object/public/" +
            data.fullPath,
        });
      }
      if (error) {
        toast.error(error.message);
      }
    }
    setImgLoader(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await updateUser(formData);
      if (res.success) {
        toast.success(res.message);
        dispatch(setUser(res.data));
      } else {
        toast.error(res.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      toast("Account Deleted");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleSignout = async () => {
    try {
      const res: ISignoutResponse = await signout();
      if (res.success) {
        dispatch(setUser(undefined));
        localStorage.removeItem("accessToken");
        window.location.reload();
        //   toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <div
          className="relative group w-32 h-32 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileInputRef.current?.click()}
        >
          {imgLoader ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <div className="loader border-t-transparent border-solid border-white border-4 rounded-full w-10 h-10 animate-spin"></div>
            </div>
          ) : (
            <img
              src={formData?.profilePicture || user?.profilePicture}
              alt="Profile Picture"
              className="w-full h-full object-cover rounded-full"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 object-cover rounded-full">
            <Icon.Edit className="text-white text-2xl" />
          </div>
        </div>
        <input
          defaultValue={formData.name}
          type="text"
          name="name"
          placeholder="Name"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
          required
        />
        <input
          defaultValue={formData.email}
          type="email"
          name="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignout} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
    </div>
  );
};
export default Profile;
