type TypeCost = {
  name: string;
  persent: string;
  data: number[];
};

type TypeCostList = {
  from: string;
  end: string;
  data: TypeCost[];
};

type TargetChartData = {
  year: number;
  month: number;
  target_income: number;
  target_outcome: number;
  income: number[];
  outcome: number[];
};

export type { TargetChartData, TypeCost, TypeCostList };
