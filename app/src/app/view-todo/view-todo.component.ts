import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from '../Models/todo.model';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.scss'],
})
export class ViewTodoComponent {
  todo$: ToDo[] = [];
  useridd: number;

  constructor(
    private route: ActivatedRoute,
    private todoservice: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const userid = params.get('userId');
        this.useridd = Number(userid);
        if (userid) {
          this.todoservice.getToDoByUserId(userid).subscribe({
            next: (response) => {
              this.todo$ = response;
            },
          });
        }
      },
    });
  }

  addToDo() {
    this.router.navigate([
      '/login-page',
      'view-todo',
      'add-todo',
      this.useridd,
    ]);
  }

  signOut(){
    this.router.navigate(['login-page'])
  }
}
