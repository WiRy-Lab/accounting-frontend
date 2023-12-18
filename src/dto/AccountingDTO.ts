import type { CategoryDTO } from '@/dto/CategoryDTO';

type AccountingFilterDTO = {
  from?: string;
  end?: string;
  category?: string;
};

type AccountingDTO = {
  id: number;
  type: string;
  amount: number;
  date: string;
  category: CategoryDTO[];
};

type AccountingCategoryDTO = {
  name: string;
};

type AccountingCreateDTO = {
  type: string;
  amount: number;
  date: string;
  category: AccountingCategoryDTO[];
};

type AccountingListDTO = {
  from: string;
  end: string;
  data: AccountingDTO[];
};

export type {
  AccountingDTO,
  AccountingCreateDTO,
  AccountingFilterDTO,
  AccountingListDTO,
};
