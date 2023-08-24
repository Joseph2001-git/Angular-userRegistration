import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-succesful-registration',
  templateUrl: './succesful-registration.component.html',
  styleUrls: ['./succesful-registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SuccesfulRegistrationComponent implements OnInit {
  display: any;

  constructor(private acti: ActivatedRoute) {}

  ngOnInit() {
    this.acti.queryParams.subscribe((params) => {
      this.display = params['firstname'] + ' ' + params['lastname'];
      console.log(JSON.stringify(this.display));
    });
  }
}
