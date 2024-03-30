import {
  Avatar,
  Box,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import { axiosIntelisen } from "../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { Get_Users } from "../../../store/Slice/useSliceUserAll";
import { RootType } from "../../../types/storeType";
import { IUser } from "../../../types/TypeData";
import { CardUser } from "../../../components/CardUser";

export const DetailSearch = () => {
  const [search, setSearch] = useState("");
  const [massage, setMassage] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const response = await axiosIntelisen.get(`/search`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(Get_Users(response.data));
      console.log("user", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const userAll = useSelector((state: RootType) => state.getUserAll.data);

  useEffect(() => {
    fetchUsers();
  }, []); // Fetch users only once on component mount

  useEffect(() => {
    const filteredData = search
      ? userAll.filter((user) =>
          user.username.toLowerCase().includes(search.toLowerCase())
        )
      : [];
    if (search.length > 0) {
      if (filteredData.length > 0) {
        setMassage(false);
        setFilteredUsers(filteredData);
      } else {
        setMassage(true);
        setFilteredUsers([]);
      }
    } else {
      setFilteredUsers([]);
      setMassage(false);
    }
  }, [search, userAll]);

  return (
    <Box w="100%" h="100vh" bg="#171923" pt={6}>
      <Box w="80%" mx="auto">
        <InputGroup borderRadius="50px" size="md" color="white">
          <InputLeftElement
            pointerEvents="none"
            children={<MdPersonSearch size={23} color="white" />}
          />
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            border="1px solid #949494"
            borderRadius="20px"
            bg="#1A202C"
            px={4}
          />
        </InputGroup>

        {filteredUsers.map((user, index) => (
          <Box
            key={index}
            mb={6}
            w={"100%"}
            border={1}
            borderWidth={"1px solid #949494"}
          >
            <CardUser
              name={user.name}
              username={user.username}
              picture={user.picture}
              id={user.id}
              bio={user.bio}
              following={user.following}
              followers={user.follower}
            />
          </Box>
        ))}
        {massage && <Text color="white">Data Not Found</Text>}
      </Box>
    </Box>
  );
};
