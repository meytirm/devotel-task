type Meta = {
  skip: number;
  limit: number;
  total: number;
};

export type PaginatedResponse<T> = T & Meta;
