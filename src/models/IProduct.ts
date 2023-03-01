import { IUser } from "./IUser";

export interface IProduct {
  _id?: string,
  title: string,
  price: number,
  imageUrl?: string
  user?: IUser
}