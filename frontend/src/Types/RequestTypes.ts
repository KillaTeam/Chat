import { IUser } from "./UserTypes"

export interface RequestTypes{
    accessToken:string
    refreshToken:string
    user:IUser
    errors?:[]
}