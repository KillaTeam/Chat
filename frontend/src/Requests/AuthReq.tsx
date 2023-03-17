import { AxiosResponse } from "axios";
import { request } from "../Interceptors/InterHeader";
import { RequestTypes } from "./../Types/RequestTypes";

export const login = async (
  Email: string,
  Password: string
): Promise<AxiosResponse<RequestTypes>> => {
  return request.post<RequestTypes>(`${process.env.REACT_APP_API_URL}/login`, {
    Email,
    Password,
  });
};














export const registration = async (
  Email: string,
  Name: string,
  Password: string
): Promise<AxiosResponse<RequestTypes>> => {
  return request.post<RequestTypes>(
    `${process.env.REACT_APP_API_URL}/registration`,
    {
      Email,
      Name,
      Password,
    }
  );
};












export const logout = async ():Promise<void> => {
    return request.post(`${process.env.REACT_APP_API_URL}/logout`);
  };