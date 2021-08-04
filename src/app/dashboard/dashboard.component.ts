import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loginInvalid = false;

  filteredNationalityList: Observable<any[]>;
  filteredLangList: Observable<any[]>;
  countryList: any[] = [];
  languageList: any[] = [];
  formData: FormGroup;

  title = "Stepper input";
  initialValue = 1;
  step: number = 0;
  min: number = 0;
  max: number = 0;
  symbol: string;
  ariaLabelLess: string;
  ariaLabelMore: string;
  renderedValue: string;
  value: number = 0;
  firstName: any;

  constructor(
    private fb: FormBuilder,
    private webService: WebService
  ) {

    const reg = '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';
    this.formData = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(reg)]],
      country: ['', Validators.required],
      name: ['', Validators.required],
      hunch: [''],
      quality: [''],
      sourceType: ['', Validators.required],
      language: ['', Validators.required],
      authority: ['', Validators.required],
      site: ['', Validators.required],
      isHttps: [false],
      isGovernmentSource: [false],
      isLoginRequire:[false],
      isreCaptcha:[false],
      isCaptcha:[false],
      scriptTags:[0]
    });
  }

  ngOnInit() {
    this.formInitialize();
    this.getNationalityList();
    this.getLanguageList();
    this.filterNationalityInitialize();

    this.value = this.initialValue
    this.renderedValue = this.value.toString() + this.symbol;
  }

  toggleMore = () => {
    if (this.step + this.value <= this.max) {
      this.value = this.value + this.step;
      this.renderedValue = this.value.toString() + this.symbol;
    }
  };

  toggleLess = () => {
    if (this.value - this.step >= this.min) {
      this.value = this.value - this.step;
      this.renderedValue = this.value.toString() + this.symbol;
    }
  };

  formInitialize() {

  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  onSubmit() {
    let model = this.formData;
    let request = {   
     url:model.get('url')?.value,
     name:model.get('name')?.value,
     country:model.controls['country'].value?model.controls['country'].value.name:'',
     language:model.controls['language'].value?model.controls['language'].value.name:'',
     originalHunch: model.get('hunch')?.value,
     qualityOfSite :  model.get('quality')?.value,
     isHTTPS: model.get('isHttps')?.value,
     isGovSource:model.get('isGovernmentSource')?.value,
     sourceType : model.get('sourceType')?.value,
     approvedAuthority : model.get('authority')?.value,
     isLoginRequired: model.get('isLoginRequire')?.value,
     isreCAPTCHA :  model.get('isreCaptcha')?.value,
     isCAPTCHA :  model.get('isCaptcha')?.value,
     numberOfScriptTags : model.controls['scriptTags'].value,
    }
    console.log(request)
      this.webService.postMLModel(request).subscribe(
          response=>{
            console.log(response)
          }
      )
  }


  filterNationalityInitialize() {
    this.filteredNationalityList = this.formData.controls['country'].valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterCountry(value))
      );

    this.filteredLangList = this.formData.controls['language'].valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterLanguage(value))
      );

  }

  private filterCountry(value: string) {
    if (!value) { return this.countryList; }
    return this.countryList.filter(option => option.name.toLowerCase().includes(value));
  }

  getNationalityList() {
    this.webService.getCountries().subscribe(
      (data: any) => {
        if (data) {
          this.countryList = data;
        }
      });
  }

  private filterLanguage(value: string) {
    if (!value) { return this.languageList; }
    return this.languageList.filter(option => option.name.toLowerCase().includes(value));
  }

  getLanguageList() {
    this.webService.getLang().subscribe(
      (data: any) => {
        if (data) {
          this.languageList = data;
        }
      });
  }

  displayLanguage(langObj: any) {
    return langObj ? langObj.name : undefined;
  }

  displayNationality(countryObj: any) {
    return countryObj ? countryObj.name : undefined;
  }


}


