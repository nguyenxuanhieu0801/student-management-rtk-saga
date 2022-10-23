export interface Student {
  id?: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  mark: number;
  city: string;
  createAt?: number;
  updateAt?: number;
}
