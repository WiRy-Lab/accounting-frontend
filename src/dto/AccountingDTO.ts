type AccountingFilterDTO = {
  from?: string;
  end?: string;
  category?: string;
};

type Category = {
  id: number;
  name: string;
};

type AccountingDTO = {
  id: number;
  type: string;
  amount: number;
  date: string;
  category: Category[];
};

type AccountingListDTO = {
  from: string;
  end: string;
  data: AccountingDTO[];
};

export type { AccountingDTO, AccountingFilterDTO, AccountingListDTO };
