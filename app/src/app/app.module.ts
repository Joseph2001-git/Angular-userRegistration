import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { SuccesfulRegistrationComponent } from './succesful-registration/succesful-registration.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewUsersComponent } from './view-users/view-users.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewTodoComponent } from './view-todo/view-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    SuccesfulRegistrationComponent,
    ViewUsersComponent,
    LoginPageComponent,
    EditUserComponent,
    ViewTodoComponent,
    EditTodoComponent,
    AddTodoComponent,
  ],
  exports: [RouterModule],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'login-page',
        component: LoginPageComponent,
      },
      {
        path: 'login-page/view-todo/:userId',
        component: ViewTodoComponent,
      },
      {
        path: 'login-page/view-todo/add-todo/:userId',
        component: AddTodoComponent,
      },
      {
        path: 'login-page/view-todo/edit-todo/:id',
        component: EditTodoComponent,
      },
      {
        path: 'user-registration',
        component: UserRegistrationComponent,
      },
      {
        path: 'succesful-registration',
        component: SuccesfulRegistrationComponent,
      },
      {
        path: 'view-users',
        component: ViewUsersComponent,
      },
      {
        path: 'view-users/user-registration',
        component: UserRegistrationComponent,
      },
      {
        path: 'view-users/add-todo',
        component: AddTodoComponent,
      },

      {
        path: 'view-users/edit-user/:id',
        component: EditUserComponent,
      },
      {
        path: 'view-users/edit-todo/:id',
        component: EditTodoComponent,
      },

      {
        path: '',
        redirectTo: 'login-page',
        pathMatch: 'full',
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
