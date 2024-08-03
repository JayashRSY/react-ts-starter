import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { IGoogleResponse } from "../interfaces/IApiTypes";
import { google } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

interface IGoogleCredentialResponse {
  credential?: string;
  clientId?: string;
  select_by?: string;
}

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleBtn = async (
    credentialResponse: IGoogleCredentialResponse
  ) => {
    try {
      if (credentialResponse && credentialResponse.credential) {
        const res: IGoogleResponse = await google(
          credentialResponse.credential
        );
        if (res.success) {
          toast.success(res.message);
          dispatch(setUser(res.data));
          localStorage.setItem("accessToken", res.accessToken);
          navigate("/");
        } else {
          toast.error(res.message);
        }
      } else {
        toast.error("Error fetching google credential");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleBtn}
        onError={() => {
          toast.error("Some error occurred, try again!");
        }}
        useOneTap
      />
    </div>
  );
};
export default OAuth;
