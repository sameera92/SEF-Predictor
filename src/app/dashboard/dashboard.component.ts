import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';


/** Error when invalid control is dirty, touched, or submitted. */
export class BSTErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public loginInvalid = false;
  public formData: FormGroup;
  urlRegEx = '[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}(.[a-z]{2,4})?\b(/[-a-zA-Z0-9@:%_+.~#?&//=]*)?';

  constructor(
    private fb: FormBuilder,
    private _router: Router
  ) {


  }
  ngOnInit() {
    this.formInitialize();
  }

  formInitialize(): void {
    this.formData = this.fb.group({
      url: ['', {
        validators: [Validators.required, Validators.pattern(this.urlRegEx)],
        updateOn: 'blur',
      }],
      // url = new FormControl('', [
      //   Validators.required,
      //   Validators.pattern(this.urlRegEx),
      // ]);
      country: ['', Validators.required],
      language: ['', Validators.required],
      sentiment: ['', Validators.required],
      site: ['', Validators.required],
      payload: ['', Validators.required],
      governmentSource: ['', Validators.required]
    });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  onSubmit() {

  }
}





