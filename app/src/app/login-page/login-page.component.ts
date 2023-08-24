import { User } from './../Models/user.model';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginPageComponent {
  form: FormGroup;
  check: boolean = false;
  forgotpass: boolean = false;
  users: User[] = [];
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    checkPassword: '',
    country: '',
    state: '',
    city: '',
  };

  Email = new FormControl('', [Validators.required, Validators.email]);
  Password = new FormControl('', [Validators.required,Validators.minLength(8)]);

  constructor(private router: Router, private userservice: UsersService) {
    this.form = new FormGroup({
      email: this.Email,
      password: this.Password,
    });
  }

  ngOnInit() {
    this.userservice.getAllUsers().subscribe({
      next: (users) => {
        console.log(users);
        this.users = users;
      },
    });
  }

  onClick() {
    if (
      this.Email.value == 'jc@hotmail.com' &&
      this.Password.value == 'ssssssss'
    ) {
      this.router.navigate(['/view-users']);
    }
    this.user = this.users.filter((p) => p.email.toLowerCase() == this.Email.value.toLowerCase()).pop();
    if (this.users.filter((p) => p.email.toLowerCase() == this.Email.value.toLowerCase()).length <= 0) {
      console.log('No User');
      this.check=true;
    } else if (this.user.password == this.Password.value) {
      this.router.navigate(['/login-page', 'view-todo', this.user.id]);
    } else {
      this.check = true;

      console.log(this.user);
    }
  }

  forgot() {
    this.user = this.users.filter((p) => p.email.toLowerCase() == this.Email.value.toLowerCase()).pop();

    this.userservice.updateUser(this.user.id, this.user).subscribe({
      next: (user) => {
        console.log(user);
        this.check = false;
        this.forgotpass = false;
      },
    });
    this.Password.reset();
  }



  }
