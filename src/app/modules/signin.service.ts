import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MustMatch } from './MustMatch';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private _LogedEmail: BehaviorSubject<string>;
  public getLogedEmail(): Observable<string> {
    return this._LogedEmail.asObservable();
  }
  public setLogedEmail(value: string) {
    this._LogedEmail.next(value);
  }

  private _LogedFirstname: BehaviorSubject<string>;
  public getLogedFirstname(): Observable<string> {
    return this._LogedFirstname.asObservable();
  }
  public setLogedFirstname(value: string) {
    this._LogedFirstname.next(value);
  }

  private _LogedLastName: BehaviorSubject<string>;
  public getLogedLastName(): Observable<string> {
    return this._LogedLastName.asObservable();
  }
  public setLogedLastName(value: string) {
    this._LogedLastName.next(value);
  }

  private _LogedId: BehaviorSubject<number>;
  public getLogedId(): Observable<number> {
    return this._LogedId.asObservable();
  }
  public getLogedIdval(){
    return this._LogedId.value;
  }
  public setLogedId(value: number) {
    this._LogedId.next(value);
  }

  constructor() {
    this._LogedEmail= new BehaviorSubject<string>("");
    this._LogedFirstname= new BehaviorSubject<string>("");
    this._LogedLastName= new BehaviorSubject<string>("");
    this._LogedId= new BehaviorSubject<number>(0);
   }
   // user account management forms
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
  },
    {
      validators: MustMatch('password', 'confirmPassword')
    });
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
  });
  // create tasksheet form
  TaskSheetControl: FormGroup = new FormGroup({
    TaskSheetName: new FormControl('', [Validators.required,Validators.maxLength(50)]),
    TasksheetSubject: new FormControl('', Validators.required)
  });
  // create question forms
  MCfrom: FormGroup = new FormGroup({
    Question: new FormControl('', Validators.required),
    Rightanswer: new FormControl('', Validators.required),
    Wronganswer1: new FormControl('', Validators.required),
    Wronganswer2: new FormControl('', Validators.required),
    Wronganswer3: new FormControl('', Validators.required),
  });
  FTfrom: FormGroup = new FormGroup({
    Question: new FormControl('', Validators.required),
    Answer: new FormControl('', Validators.required),
    TaskTip: new FormControl('', Validators.required),
  })
  // update question forms


  //this.service.loginForm.reset() alles auf null setzten in der form 
  logOut() {
    this.setLogedEmail("");
    this.setLogedFirstname("");
    this.setLogedLastName("");
    this.setLogedId(0);
  }
  initializeFormGroup() {
    this.loginForm.setValue({
      email: '',
      password: '',
    });

    this.registerForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  }


}



