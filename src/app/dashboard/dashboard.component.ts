import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebService } from '../services/web.service';
import { DataService } from '../services/dataService';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoaderService } from '../services/loaderService';

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
  firstName: string | null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds:number = 2;
  constructor(
    private fb: FormBuilder,
    private webService: WebService,
    private _router: Router,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    private loader: LoaderService
  ) {

    const reg = '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';
    this.formData = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(reg)]],
      name: ['', Validators.required],
      country: [''],
      hunch: [''],
      quality: [''],
      sourceType: ['', Validators.required],
      language: ['', Validators.required],
      authority: ['', Validators.required],
      isHttps: [false],
      isGovernmentSource: [false],
      isLoginRequire:[false],
      isreCaptcha:[false],
      isCaptcha:[false]
    });
  }

  ngOnInit() {
    this.loader.showLoader();
    this.dataService.changeLogedInStatus(true);
    this.firstName = localStorage.getItem('name');
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
    this.loader.showLoader();
    if(this.formData.valid){
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
     isCAPTCHA :  model.get('isCaptcha')?.value
    }
    console.log(request)
      this.webService.postMLModel(request).subscribe(
          (response=>{
            if(response){
            this.dataService.changeData(response);
            this._router.navigate(['/results']);
            }else{
            this.dataService.changeData([]);
            this._snackBar.open('No Fetch Data.Please Try Again', '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 2000,
              panelClass: "success-dialog"
            });
            }
            this.loader.hideLoader();
          }
      ),
      error => {
        this._snackBar.open('Something went wrong...', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 2000,
          panelClass: "error-dialog"
        });
        this.loader.hideLoader();
      }
      )
    }else if(this.formData.invalid){
      this._snackBar.open('Please Fill mandatory fields...', '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 2000,
        panelClass: "error-dialog"
      });
      this.loader.hideLoader();
    }
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

  async getNationalityList() {
    await new Promise(resolve => setTimeout(resolve, 3000))
    this.webService.getCountries().subscribe(
      (data: any) => {
        if (data) {

          this.countryList = data;
          this.loader.hideLoader();
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

  viewPreviousResult(){
    this.webService.getPreviousResults().subscribe(
      (response=>{
        if(response){
          this.dataService.changeData(response);
          this._router.navigate(['/results']);
        }else{
          this.dataService.changeData([]);
          this._snackBar.open('No Fetch Data.Please Try Again', '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 2000,
            panelClass: "success-dialog"
          });
        }
      }),
      error => {
        this._snackBar.open('Something went wrong...', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 2000,
          panelClass: "error-dialog"
        });
      }
    )
  }

}


