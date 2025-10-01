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

export interface PaginationParams {
  page?: number | undefined;
  limit?: number | undefined;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}