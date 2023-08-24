import { Component, ViewEncapsulation } from '@angular/core';
import { ToDo } from '../Models/todo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddTodoComponent {
  todoDetails: ToDo = {
    id: 0,
    toDoMessage: '',
    userId: 0,
  };

  admin: boolean;

  constructor(
    private route: ActivatedRoute,
    private todoservice: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.router.url.includes('login-page/view-todo')) {
      this.admin = false;
    } else {
      this.admin = true;
    }
  }

  createToDo() {
    if (this.router.url.includes('login-page/view-todo')) {
      this.route.paramMap.subscribe({
        next: (params) => {
          const userid = params.get('userId');
          console.log(userid);
          if (userid) {
            this.todoservice
              .createToDo(this.todoDetails, Number(userid))
              .subscribe({
                next: (user) => {
                  this.router.navigate([
                    '/login-page',
                    'view-todo',
                    Number(userid),
                  ]);
                },
              });
          }
        },
      });
    } else {
      this.todoservice
        .createToDo(this.todoDetails, this.todoDetails.userId)
        .subscribe({
          next: (user) => {
            this.router.navigate(['view-users']);
          },
        });
    }
  }

  cancelToDo() {
    if (this.router.url.includes('login-page/view-todo')) {
      this.router.navigate([
        '/login-page',
        'view-todo',
        this.todoDetails.userId,
      ]);
    } else {
      this.router.navigate(['view-users']);
    }
  }
}
