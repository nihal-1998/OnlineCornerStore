

export interface IType {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}


export type TTypeQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
