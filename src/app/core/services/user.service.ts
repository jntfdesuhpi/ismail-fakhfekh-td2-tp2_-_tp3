import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../user/feature/models/user';
import { usersData } from '../../user/feature/data/users.data';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    return of(usersData);
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(usersData.find((user) => user.id === id));
  }
}
