export interface LaptopOption {
  label: string;
  price: number;
}

export const LAPTOPS: LaptopOption[] = [
  { label: "Dell Latitude 5540",          price: 450 },
  { label: "Lenovo ThinkPad T14s",        price: 480 },
  { label: "HP EliteBook 840 G10",        price: 550 },
  { label: "Dell XPS 15",                 price: 700 },
  { label: "Lenovo ThinkPad X1 Carbon",   price: 750 },
  { label: "MacBook Pro 14\" M3",         price: 1200 },
  { label: "MacBook Pro 16\" M3 Max",     price: 2000 },
];

export function laptopsForBudget(budgetEuros: number): LaptopOption[] {
  return LAPTOPS.filter((l) => l.price <= budgetEuros);
}
