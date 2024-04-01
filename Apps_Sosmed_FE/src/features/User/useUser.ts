import { useDispatch } from "react-redux";
import { axiosIntelisen } from "../../lib/axios";
import { USER_ID } from "../../store/Slice/useSliceUser";

const useUser = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const getUser = async () => {
    try {
      const response = await axiosIntelisen.get("/user/me/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      dispatch(USER_ID(response.data));
    } catch (error) {
      console.log("error", error);
    }
  };

  return { getUser };
};

export default useUser;
