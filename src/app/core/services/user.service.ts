import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../user/feature/models/user';
import { usersData } from '../../user/feature/data/users.data';

@Injectable({ providedIn: 'root' })
export class UserService {
  public static id = Math.floor(Math.random() * 100);

  constructor() {
    console.log("user id", UserService.id);
  }

  getUsers(): Observable<User[]> {
    return of(usersData);
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(usersData.find((user) => user.id === id));
  }

  getUserName(id?: number): string {
    if (!id) {
      return 'Non assignée';
    }
    const user = usersData.find((user) => user.id === id);
    return user ? user.name : 'Non assignée';
  }
}
