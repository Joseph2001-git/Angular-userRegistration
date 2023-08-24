import { User } from './../Models/user.model';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DropdownService } from '../services/dropdown.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchPassword } from '../match-password.validator';
import { Country } from '../Models/country-model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss', './custom.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserRegistrationComponent implements OnInit {
  title = 'User Registration Form';
  name: any;
  form: FormGroup;
  stop: boolean;
  addUserRequest: User = {
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

  countries: Country[];
  states: string[];
  cities: string[];

  firstName = new FormControl('', [
    Validators.minLength(2),
    Validators.required,
  ]);
  lastName = new FormControl('', [
    Validators.minLength(2),
    Validators.required,
  ]);

  email = new FormControl('', [Validators.email, Validators.required]);

  password = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
  ]);

  checkPassword = new FormControl('', [Validators.minLength(8)]);

  country = new FormControl(null, [Validators.required]);
  city = new FormControl('', [Validators.required]);

  state = new FormControl(null, [Validators.required]);

  constructor(
    private router: Router,
    private dropdownService: DropdownService,
    private userService: UsersService
  ) {
    this.form = new FormGroup(
      {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,

        password: this.password,
        checkPassword: this.checkPassword,

        country: this.country,
        city: this.city,
        state: this.state,
      },
      {
        validators: matchPassword,
      }
    );

    this.countries = dropdownService.getCountries();
  }

  ngOnInit() {
    this.state.disable();
    this.city.disable();
    this.country.valueChanges.subscribe((country) => {
      this.state.reset();
      this.state.disable();
      if (country) {
        this.states = this.dropdownService.getStatesByCountry(country);
        this.state.enable();

        if (this.states.length == 0) {
          this.states = ['No State'];
        }
      }
    });

    this.state.valueChanges.subscribe((state) => {
      this.city.reset();
      this.city.disable();
      if (state) {
        this.cities = this.dropdownService.getCitiesByState(
          this.country.value,
          state
        );
        this.city.enable();

        if (this.cities.length == 0) {
          this.cities = ['No City'];
        }
      }
    });
  }

  addUser() {
    this.addUserRequest.firstName = this.firstName.value;
    this.addUserRequest.lastName = this.lastName.value;
    this.addUserRequest.email = this.email.value;
    this.addUserRequest.password = this.password.value;
    this.addUserRequest.checkPassword = this.checkPassword.value;
    this.addUserRequest.country = this.country.value;
    this.addUserRequest.state = this.state.value;
    this.addUserRequest.city = this.city.value;
    this.userService.addUser(this.addUserRequest).subscribe({
      next: (user) => {
        if (user.firstName == null) {
          alert('Email is invalid');
          this.stop = false;
        } else {
          this.stop = true;
        }
        console.log(user);
        if (this.stop && this.router.url.includes('view-users')) {
          this.router.navigate(['view-users']);
        } else if (this.stop) {
          this.router.navigate(['/succesful-registration'], {
            queryParams: {
              firstname: this.firstName.value,
              lastname: this.lastName.value,
            },
          });
        }
      },
    });
  }


}
