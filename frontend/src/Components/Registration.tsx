import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useForm, Resolver } from "react-hook-form";
import Palete from "../Themes/Palete";
import { RegForm } from "../Types/FormsTypes";
import axios, { AxiosResponse } from "axios";
import { RequestTypes } from "../Types/RequestTypes";
import { request } from '../Interceptors/InterHeader';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const resolver: Resolver<RegForm> = async (values) => {
  return {
    values: values.Name
      ? values
      : {} || values.Email
      ? values
      : {} || values.Password
      ? values
      : {} || values.ConfirmPassword
      ? values
      : {},
    errors: !values.Name
      ? {
          Name: {
            type: "required",
            message: "This is requred.",
          },
        }
      : values.Name.length < 1 || values.Name.length > 25
      ? {
          Name: {
            type: "required",
            message: "Name must be at least 1 characters up to 25",
          },
        }
      : !values.Email
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
      : !values.ConfirmPassword || values.ConfirmPassword !== values.Password
      ? {
          ConfirmPassword: {
            type: "required",
            message: "Wrong Compare",
          },
        }
      : {},
  };
};

const validateName = (value: string) => {
  if (!(value.length >= 1 && value.length <= 25)) {
    return "max 25";
  }
  return value.trim().length > 0 || "Name empty";
};

const validatePassword = (value: string) => {
  return (value.length >= 6 && value.length <= 25) || "min 6 max 25";
};

export default function Registration()  {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegForm>({ resolver });


  // const onSubmit = handleSubmit(async (data):Promise<AxiosResponse<RequestTypes>> => {
  //   const response = request.post<RequestTypes>(`${process.env.REACT_APP_API_URL}/login`, {
  //     Email: data.Email,
  //     Password: data.Password,
  //   });
  //   return response
  // });

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data):Promise<AxiosResponse<RequestTypes>> => {
    try {
      const response = await request.post<RequestTypes>(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          name: data.Name,
          email: data.Email,
          password: data.Password,
        }
      );
      if (response.data.user) {
        toast.success('Registration successful!');
      }
      return response;
    } catch (error:any) {
      if (error.response && error.response.status === 400) {
        toast.error('User already exists');
      } else {
        toast.error('An unknown error occurred. Please try again later.');
      }
      throw error;
    }
  })


  
  return (
    <TabPanel>
      
      <form onSubmit={onSubmit}>
        <Text fontSize={Palete.fontSizes["3xl"]} mb={5}>
          Registration
        </Text>
        <InputGroup margin={0} mt={5}>
          <InputLeftAddon children="Name" />
          <Input
            type={"text"}
            variant="filled"
            {...register("Name", { required: true, validate: validateName })}
            placeholder="Donald"
          />
        </InputGroup>
        {errors?.Name && (
          <Text color={Palete.text.error} fontSize={Palete.fontSizes.sm}>
            {errors.Name.message}
          </Text>
        )}
        <InputGroup margin={0} mt={5}>
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

        <InputGroup margin={0} mt={5}>
          <InputLeftAddon children="Confirm" />
          <Input
            type={"password"}
            variant="filled"
            {...register("ConfirmPassword", {
              required: true,
            })}
            placeholder="***********"
          />
        </InputGroup>
        {errors?.ConfirmPassword && (
          <Text color={Palete.text.error} fontSize={Palete.fontSizes.sm}>
            {errors.ConfirmPassword.message}
          </Text>
        )}

        <Button
          mt={5}
          variant={"outline"}
          color={Palete.buttons.extra}
          type="submit"
        >
          Create account
        </Button>
      </form>
      <ToastContainer  />
    </TabPanel>
  );
}
