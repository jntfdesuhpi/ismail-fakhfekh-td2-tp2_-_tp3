import { Task } from './task';

export type ProjectStatus = 'En attente' | 'En cours' | 'Terminé';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  tasks: Task[];
}