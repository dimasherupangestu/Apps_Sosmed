import { useState } from "react";
import { axiosIntelisen } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { RootType } from "../../types/storeType";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { UPDATE_COVER, UPDATE_Picture } from "../../store/Slice/useSliceUser";

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
  const dispatch = useDispatch();
  const naviget = useNavigate();
  const toast = useToast();

  const [user, setUser] = useState<EditUserProps>();
  const [profile, setProfile] = useState<any>(null);
  const [cover, setCover] = useState<any>(null);
  console.log("cover", cover);
  console.log("profile", profile);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const val = !userLogin.bio ? "" : userLogin.bio;

  const [form, setForm] = useState<EditUserProps>({
    name: userLogin.name,
    username: userLogin.username,
    bio: val,
  });

  const hendelSubmit = async (id: number) => {
    try {
      if (profilePicture) {
        const formData = new FormData();
        formData.append("picture", profilePicture);

        const response = await axiosIntelisen.patch(
          `/userPicture/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        dispatch(UPDATE_Picture(response.data));

        toast({
          title: "Success",
          description: "Update picture success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      if (coverPhoto) {
        const formData = new FormData();
        formData.append("cover_photo", coverPhoto);

        const response = await axiosIntelisen.patch(
          `/userCoverPhoto/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        dispatch(UPDATE_COVER(response.data));
      }

      const response = await axiosIntelisen.patch(`/user/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Success",
        description: "Update success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      naviget("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const hendelChange = (event: any) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (!file) return;

    if (event.target.name === "picture") {
      setProfilePicture(file);
      setProfile(URL.createObjectURL(file));
    } else if (event.target.name === "cover_photo") {
      setCoverPhoto(file);
      setCover(URL.createObjectURL(file));
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
    profilePicture,
    profile,
    cover,
    setProfilePicture,
    hendelChange,
    coverPhoto,
  };
};
