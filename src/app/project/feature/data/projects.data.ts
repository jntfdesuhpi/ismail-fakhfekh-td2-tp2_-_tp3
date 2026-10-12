import { Project } from '../models/project';

export const projectsData: Project[] = [
  {
    id: 1,
    name: 'Projet 1',
    description: 'Description du projet 1',
    status: 'En cours',
    tasks: [
      {
        id: 1,
        title: 'Tâche 1',
        priority: 'Haute',
        status: 'En attente'
      },
      {
        id: 2,
        title: 'Tâche 2',
        priority: 'Moyenne',
        status: 'En cours'
      }
    ]
  },
  {
    id: 2,
    name: 'Projet 2',
    description: 'Développement de la nouvelle application web',
    status: 'En attente',
    tasks: [
      {
        id: 3,
        title: 'Créer la page d’accueil',
        priority: 'Haute',
        status: 'En attente'
      },
      {
        id: 4,
        title: 'Configurer la base de données',
        priority: 'Haute',
        status: 'En cours'
      }
    ]
  },
  {
    id: 3,
    name: 'Projet 3',
    description: 'Amélioration des performances de l’application',
    status: 'Terminé',
    tasks: [
      {
        id: 5,
        title: 'Analyser les performances',
        priority: 'Moyenne',
        status: 'Terminé'
      },
      {
        id: 6,
        title: 'Optimiser les requêtes',
        priority: 'Basse',
        status: 'Terminé'
      }
    ]
  }
];