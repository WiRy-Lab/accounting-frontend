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

export type { TypeCost, TypeCostList };
