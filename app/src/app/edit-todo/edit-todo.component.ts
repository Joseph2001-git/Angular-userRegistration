import { Component, ViewEncapsulation } from '@angular/core';
import { ToDo } from '../Models/todo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditTodoComponent {
  todoDetails: ToDo = {
    id: 0,
    toDoMessage: '',
    userId: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private userservice: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.userservice.getToDoById(id).subscribe({
            next: (response) => {
              this.todoDetails = response;
            },
          });
        }
      },
    });
  }

  updateToDo() {
    this.userservice
      .updateToDo(this.todoDetails.id, this.todoDetails)
      .subscribe({
        next: (user) => {
          if (this.router.url.includes('/login-page/view-todo')) {
            this.router.navigate([
              '/login-page',
              'view-todo',
              this.todoDetails.userId,
            ]);
          } else {
            this.router.navigate(['/view-users']);
          }
        },
      });
  }

  deleteToDo() {
    this.userservice.deleteToDo(this.todoDetails.id).subscribe({
      next: (user) => {
        if (this.router.url.includes('/login-page/view-todo')) {
          this.router.navigate([
            '/login-page',
            'view-todo',
            this.todoDetails.userId,
          ]);
        } else {
          this.router.navigate(['/view-users']);
        }
      },
    });
  }
}
