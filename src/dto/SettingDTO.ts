type MonthTargetDTO = {
  year: number;
  month: number;
  income: number;
  outcome: number;
};

type SaveMoneyTarget = {
  category: number;
  target: number;
  from_date: string;
  end_date: string;
};

export type { MonthTargetDTO, SaveMoneyTarget };
