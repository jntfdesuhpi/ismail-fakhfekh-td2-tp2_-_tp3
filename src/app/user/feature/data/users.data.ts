import { User } from '../models/user';

export const usersData: User[] = [
  {
    id: 1,
    name: 'Amira Ben Salah',
    email: 'amira@taskflow.tn',
    role: 'Développeur',
    active: true,
  },
  {
    id: 2,
    name: 'Mohamed Ali',
    email: 'mohamed@taskflow.tn',
    role: 'Chef de projet',
    active: true,
  },
  {
    id: 3,
    name: 'Sarra Trabelsi',
    email: 'sarra@taskflow.tn',
    role: 'Designer',
    active: true,
  },
  {
    id: 4,
    name: 'Karim Jaziri',
    email: 'karim@taskflow.tn',
    role: 'Testeur',
    active: false,
  },
];
