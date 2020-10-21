export interface AuthSuccess {
  success: boolean;
  result: User;
  message?: string;
}

export interface User {
  name?: string;
  avatar?: string;
  phone?: string;
  id?: string;
  iid?: number;
  token?: string;
}
