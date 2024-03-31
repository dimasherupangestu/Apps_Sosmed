import { useState } from "react";
import { axiosIntelisen } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { RootType } from "../../types/storeType";
import { useSelector } from "react-redux";
import axios from "axios";

export interface EditUserProps {
  name?: string;
  username?: string;
  bio?: any;
  picture?: string;
  cover_photo?: string;
}
export const useProfile = () => {
  const token = localStorage.getItem("token");
  const userLogin = useSelector((state: RootType) => state.userStore);
  //   console.log(userLogin);
  const [user, setUser] = useState<EditUserProps>();
  const naviget = useNavigate();
  const toast = useToast();
  const [headerPreview, setHeaderPreview] = useState<any>(null);
  const [profilePreview, setProfilePreview] = useState<any>(null);
  const val = !userLogin.bio ? "" : userLogin.bio;

  const [form, setForm] = useState<EditUserProps>({
    name: userLogin.name,
    username: userLogin.username,
    bio: val,
  });
  console.log("form", form);

  const hendelSubmit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/user/${userLogin.id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast({
        title: "Success",
        description: "Update profile success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const GetUserId = async (id: number) => {
    try {
      const response = await axiosIntelisen.get(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      //   console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    GetUserId,
    user,
    hendelSubmit,
    form,
    setForm,
  };
};
