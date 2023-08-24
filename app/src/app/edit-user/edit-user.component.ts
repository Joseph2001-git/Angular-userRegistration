import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../Models/user.model';
import { Country } from '../Models/country-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../services/dropdown.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditUserComponent {
  form: FormGroup;
  countries: Country[];
  states: string[];
  cities: string[];
  country = new FormControl(null, [Validators.required]);
  city = new FormControl('', [Validators.required]);

  state = new FormControl(null, [Validators.required]);

  userDetails: User = {
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

  constructor(
    private route: ActivatedRoute,
    private userservice: UsersService,
    private dropdownService: DropdownService,
    private router: Router
  ) {
    this.form = new FormGroup({
      country: this.country,
      city: this.city,
      state: this.state,
    });

    this.countries = dropdownService.getCountries();
  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.userservice.getUserById(id).subscribe({
            next: (response) => {
              this.userDetails = response;
            },
          });
        }
      },
    });

    this.country.valueChanges.subscribe((country) => {
      if (country) {
        this.states = this.dropdownService.getStatesByCountry(country);

        if (this.states.length == 0) {
          this.states = ['No State'];
        }
      }
    });

    this.state.valueChanges.subscribe((state) => {
      if (state) {
        this.cities = this.dropdownService.getCitiesByState(
          this.country.value,
          state
        );

        if (this.cities.length == 0) {
          this.cities = ['No City'];
        }
      }
    });
  }

  updateUser() {
    this.userservice
      .updateUser(this.userDetails.id, this.userDetails)
      .subscribe({
        next: (user) => {
          this.router.navigate(['/view-users']);
        },
      });
  }

  deleteUser() {
    this.userservice.deleteUser(this.userDetails.id).subscribe({
      next: (user) => {
        this.router.navigate(['/view-users']);
      },
    });
  }
}
