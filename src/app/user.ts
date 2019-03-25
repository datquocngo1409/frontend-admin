import {IAvatar} from './avatar';

export interface IUser {
  id: number;
  username: string;
  password: string;
  name: string;
  favouriteMusic: string;
  email: string;
  address: string;
  avatar: IAvatar;
  male: boolean;
}
