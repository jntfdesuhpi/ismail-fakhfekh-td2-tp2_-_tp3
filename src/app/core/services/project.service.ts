import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { projectsData } from '../../project/feature/data/projects.data';
import { Project } from '../../project/feature/models/project';

@Injectable({ providedIn: 'root' })
export class ProjectServiceTs {
    getProjects(): Observable<Project[]> {      // res type is a stream that will deliver an array of projects.
        return of(projectsData)     // creates an Observable that emits that array right away and then finishes. It’s like Promise.resolve(data)
    }
}
