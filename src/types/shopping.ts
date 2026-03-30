export type Item = {
  id: number;
  title: string;
  count: number;
  price: number;
  marked: boolean;
};

export type FormState = {
  id: number | null;
  title: string;
  count: string;
  price: string;
};