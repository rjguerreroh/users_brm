export interface CreateUserData {
  name: string;
  email: string;
  age: number;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  age?: number;
}

export interface UserServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
