import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import { ISignoutResponse } from "../interfaces/IApiTypes";
import { signout } from "../api/authApi";
import { toast } from "react-toastify";
import { setUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../app/store";

const ProfileButton = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <div className="relative" ref={dropdownRef}>
      <button
        className="inline-flex items-center overflow-hidden rounded-full border bg-white"
        onClick={toggleDropdown}
      >
        {user?.profilePicture ? (
          <img
            src={user?.profilePicture}
            alt="profile picture"
            className="h-[32px] w-[32px]"
          />
        ) : (
          <Icon.User height={32} width={32} />
        )}
      </button>

      <div
        className={`absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ${
          isDropdownVisible ? "block" : "hidden"
        }`}
        role="menu"
      >
        <div className="p-2">
          <Link
            to="/profile"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <Icon.User height={16} />
            Profile
          </Link>
        </div>

        <div className="p-2">
          <button
            onClick={handleSignout}
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
          >
            <Icon.LogOut height={16} />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileButton;
