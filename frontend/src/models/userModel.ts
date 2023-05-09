export interface UserModel {
  email: string,
  username: string,
  password: string,
  year: number,
  isAdmin: boolean,
}

export interface InputUserModel extends UserModel {
  _id: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}
