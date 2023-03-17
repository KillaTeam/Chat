import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import React, { FC } from "react";
import { useForm, Resolver } from "react-hook-form";
import Palete from "../Themes/Palete";
import { LoginForm } from "../Types/FormsTypes";
import { RequestTypes } from "../Types/RequestTypes";
import { request } from "../Interceptors/InterHeader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const resolver: Resolver<LoginForm> = async (values) => {
  return {
    values: values.Email ? values : {} || values.Password ? values : {},
    errors: !values.Email
      ? {
          Email: {
            type: "required",
            message: "Invalid email",
          },
        }
      : !values.Password ||
        values.Password.length < 6 ||
        values.Password.length > 25
      ? {
          Password: {
            type: "required",
            message: "(min6 max25).",
          },
        }
      : {},
  };
};

const validatePassword = (value: string) => {
  return (value.length >= 6 && value.length <= 25) || "min 6 max 25";
};

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver });

  const onSubmit = handleSubmit(
    async (data): Promise<AxiosResponse<RequestTypes>> => {
      try {
        const response = request.post<RequestTypes>(
          `${process.env.REACT_APP_API_URL}/login`,
          {
            email: data.Email,
            password: data.Password,
          }
        );
        if ((await response).data.accessToken) {
          navigate("/chat");
        } else {
          navigate("/");
        }
        return response;
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          toast.error("Login fail");
        } else {
          toast.error("An unknown error occurred. Please try again later.");
        }
        throw error;
      }
    }
  );

  return (
    <TabPanel  minHeight={340} padding={0}>
      <form onSubmit={onSubmit}>
        <Text fontSize={Palete.fontSizes["3xl"]} mb={5}>
          Login
        </Text>
        <InputGroup mt={5}>
          <InputLeftAddon children="Email" />
          <Input
            variant="filled"
            type={"email"}
            {...register("Email", { required: true })}
            placeholder="yourtruemail@gmail.com"
          />
        </InputGroup>
        {errors?.Email && (
          <Text color={Palete.text.error} fontSize={Palete.fontSizes.sm}>
            {errors.Email.message}
          </Text>
        )}
        <InputGroup margin={0} mt={5}>
          <InputLeftAddon children="Password" />
          <Input
            variant="filled"
            type={"password"}
            {...register("Password", {
              required: true,
              validate: validatePassword,
            })}
            placeholder="***********"
          />
        </InputGroup>
        {errors?.Password && (
          <Text color={Palete.text.error} fontSize={Palete.fontSizes.sm}>
            {errors.Password.message}
          </Text>
        )}

        <Button
          mt={20}
          variant={"outline"}
          color={Palete.buttons.extra}
          type="submit"
          onClick={() => Login()}
        >
          Login
        </Button>
      </form>
      <ToastContainer />
    </TabPanel>
  );
}
