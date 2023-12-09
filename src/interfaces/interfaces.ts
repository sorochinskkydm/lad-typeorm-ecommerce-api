export interface IUser {
  id?: number;
  lastName?: string;
  firstName?: string;
  surname?: string;
  email?: string;
  user_pass?: string;
}

export interface IGoods {
  title: string;
  description: string;
  type: string;
  producer: string;
  price: number;
}
