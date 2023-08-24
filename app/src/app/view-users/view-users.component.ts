import { Router } from '@angular/router';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent {
  users: User[]=[]
  userid:string;
  users$: Observable<User[]>;


  constructor(private userservice: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.users$ = this.userservice.getAllUsers();
     this.userservice.getAllUsers().subscribe({
      next: (users) => {
        console.log(users);
        this.users = users;
      },
    });
  }


  addUser() {
    this.router.navigate(['/view-users', 'user-registration']);
  }
  signOut(){
    this.router.navigate(['login-page'])
  }

  searchById(){
      this.userservice.getUserById(this.userid).subscribe({
        next: (users) => {
          console.log(users);
          this.users=this.users.filter(p=>p.id == users.id);
        },
      });


  }

  ngOnDestroy() {}
}
