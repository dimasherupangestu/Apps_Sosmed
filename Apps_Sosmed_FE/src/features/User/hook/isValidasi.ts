import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const isValidasi = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const scema = yup.object().shape({
    username: yup.string().required().min(3, "Minimal 3 karakter usename"),
    password: yup.string().required(),
  });
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(scema),
    mode: "all",
    reValidateMode: "onChange",
  });

  return {
    control,
    handleSubmit,
  };
};
