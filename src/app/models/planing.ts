export interface Planing {
  title: string;
  description: string;
  status: 'Done' | 'Doing' | 'Passed' | 'Not Done';
  date: string;
  place_name: string;
  address: string;
}
