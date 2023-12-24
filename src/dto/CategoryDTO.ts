type CategoryDTO = {
  id: number;
  name: string;
};

type CategoryCreateDTO = {
  name: string;
};

type CategoryFilterDTO = {
  name: string;
};
export type { CategoryCreateDTO, CategoryDTO, CategoryFilterDTO };
