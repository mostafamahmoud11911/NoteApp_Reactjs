import axios from "axios";
import { loginUser, logoutUser } from "./AuthSlice";
import { toast } from "react-toastify";

export const login = (user) => async (dispatch) => {

    const { data } = await axios.post(
      "https://note-sigma-black.vercel.app/api/v1/users/signIn",
      user
    );
    if (data.msg === "done") {
      localStorage.setItem("user", `3b8ny__${data.token}`);
      dispatch(loginUser(`3b8ny__${data.token}`));
    }
return data;

};

export const logout = () => (dispatch) => {
  // Perform logout API call here if needed
  localStorage.removeItem("user");
  dispatch(logoutUser());
};
