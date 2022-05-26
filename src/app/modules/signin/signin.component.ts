import { Component, OnInit } from '@angular/core';
import {  FormBuilder } from '@angular/forms'
import { SharedService } from 'src/app/shared.service';
import { SigninService } from '../signin.service';
import { teacher } from '../teacher.model';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { registerLocaleData } from '@angular/common';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

 

  constructor(public fb: FormBuilder, 
              private service: SigninService, 
              private serviceS: SharedService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<SigninComponent>,) {
    dialogRef.disableClose = true;
  }
  result:any=[];
  ngOnInit() {
    this.service.loginForm.reset();
    this.service.registerForm.reset();
    this.serviceS.getUser().subscribe(data => {
      this.result=data;
      console.log(this.result);
    });
    }

    delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    closeDialog(){
      this.dialogRef.close();
    }
    openSnackBar(message) {
      this.snackBar.open(''+message+'', '' ,{
        duration: 3 * 1000,
      });
    }

  async onSubmit() {
    switch (true) {
      case this.service.loginForm.valid:

        var email = String(this.service.loginForm.controls['email'].value);
        var password = String(this.service.loginForm.controls['password'].value);
        var logincheck= 0;
        console.log(email, password)
        var LoginUser= new teacher();
          this.result.forEach(function(item) {
            if(item.Email==email && item.Password==password){
              logincheck++;
              LoginUser.Email= item.Email;
              LoginUser.Firstname= item.Firstname;
              console.log(item.Firstname);
              LoginUser.Lastname= item.Lastname;
              LoginUser.TeacherId= item.TeacherId;
              
              //set global login data 
            }
            
          }); 
           if(logincheck == 0){
            this.openSnackBar("Ungültige Anmeldeinformationen");
              this.service.loginForm.reset();
              
            }else if(logincheck == 1){
              this.service.setLogedEmail(LoginUser.Email);
              this.service.setLogedFirstname(LoginUser.Firstname);
              this.service.setLogedLastName(LoginUser.Lastname);
              this.service.setLogedId(LoginUser.TeacherId);
              console.log(logincheck);
              this.closeDialog();
              this.openSnackBar("Login Erfolgreich!");
            }

        break;
      case this.service.registerForm.valid:
        var register = new teacher();
        register.TeacherId= 0;
        register.Firstname = this.service.registerForm.controls['firstName'].value;
        register.Lastname =this.service.registerForm.controls['lastName'].value;
        register.Email= this.service.registerForm.controls['email'].value;
        register.Password=  this.service.registerForm.controls['password'].value

        var breakcheck = new Boolean(false);
        var BreakException = {};
        try {
        this.result.forEach(function(item) {
          if(item.Email==register.Email){
            breakcheck = true;
            
          }
       
        }); 
        } catch (e){
          if (e !== BreakException) throw e;
        }
       if (breakcheck==false){
         this.serviceS.addUser(register).subscribe(result => {
          this.openSnackBar(result.toString());});
       }else {
         this.openSnackBar("Diese Email ist bereits registriert!");}
       await this.delay(250);
       this.ngOnInit();
        
    }

  }

}


