
export enum Screen {
  HOME = 'HOME',
  REPORTS = 'REPORTS',
  CONTRACTORS = 'CONTRACTORS',
  STAGE_DETAILS = 'STAGE_DETAILS',
  ADD_EXPENSE = 'ADD_EXPENSE'
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  category: string;
  amount: number;
  icon: string;
  type: 'expense' | 'income';
}

export interface ConstructionStage {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'not-started';
  spent: number;
  planned: number;
  icon: string;
  color: string;
}

export interface Payment {
  id: string;
  title: string;
  date: string;
  amount: number;
  icon: string;
  color: string;
}

export interface Contractor {
  id: string;
  name: string;
  specialty: string;
  agreedAmount: number;
  paidAmount: number;
  initials: string;
  status: 'active' | 'completed';
  payments: Payment[];
}
