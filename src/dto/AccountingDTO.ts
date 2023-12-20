import type { CategoryDTO } from '@/dto/CategoryDTO';

type AccountingFilterDTO = {
  from?: string;
  end?: string;
  category?: string;
};

type AccountingDTO = {
  id: number;
  title: string;
  type: string;
  amount: number;
  date: string;
  category: CategoryDTO[];
  description?: string;
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

type AccountingUpdateDTO = AccountingCreateDTO & {
  id: number;
};

type AccountingListDTO = {
  from: string;
  end: string;
  data: AccountingDTO[];
};

export type {
  AccountingCreateDTO,
  AccountingDTO,
  AccountingFilterDTO,
  AccountingListDTO,
  AccountingUpdateDTO,
};
