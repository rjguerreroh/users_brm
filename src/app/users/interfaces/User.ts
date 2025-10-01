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

export interface SearchParams {
  search?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  ageMin?: number | undefined;
  ageMax?: number | undefined;
  sortBy?: 'name' | 'email' | 'age' | 'createdAt' | 'updatedAt' | undefined;
  sortOrder?: 'ASC' | 'DESC' | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

export interface SearchResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    search?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    ageMin?: number | undefined;
    ageMax?: number | undefined;
    sortBy: string;
    sortOrder: string;
  };
}