import { UserRegistrationComponent } from './../user-registration/user-registration.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ToDo } from '../Models/todo.model';
import { UserRole } from '../Models/userrole.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.baseApiUrl;

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/api/User/All');
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/api/User/' + id);
  }

  addUser(addUserRequest: User): Observable<User> {
    return this.http.post<User>(
      this.apiUrl + '/api/User/Create',
      addUserRequest
    );
  }

  updateUser(id: number, updateUserRequest: User): Observable<User> {
    return this.http.put<User>(
      this.apiUrl + '/api/User/Update/' + id,
      updateUserRequest
    );
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.apiUrl + '/api/User/Delete/' + id);
  }


  getAllToDo(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl + '/api/ToDo');
  }

  getToDoByUserId(userid: string): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl + '/api/ToDo/Get/' + userid);
  }

  getToDoById(id: string): Observable<ToDo> {
    return this.http.get<ToDo>(this.apiUrl + '/api/ToDo/' + id);
  }

  createToDo(createToDoRequest: ToDo, userid: number): Observable<ToDo> {
    return this.http.post<ToDo>(
      this.apiUrl + '/api/ToDo/Create/' + userid,
      createToDoRequest
    );
  }

  updateToDo(id: number, updateToDoRequest: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(
      this.apiUrl + '/api/ToDo/Update/' + id,
      updateToDoRequest
    );
  }

  deleteToDo(id: number): Observable<User> {
    return this.http.delete<User>(this.apiUrl + '/api/ToDo/Delete/' + id);
  }

  getUserRoleByUserID(userid:number):Observable<UserRole>{
    return this.http.get<UserRole>(this.apiUrl + "/api/UserRoles/Get/" + userid);
  }
}
