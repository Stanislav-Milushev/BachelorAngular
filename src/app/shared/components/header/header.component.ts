import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MatDialogConfig,MatDialog} from '@angular/material/dialog';
import { SigninComponent } from 'src/app/modules/signin/signin.component';
import { SigninService } from 'src/app/modules/signin.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();


  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  constructor(private service: SigninService, private dialog: MatDialog) { 
  
  }

  ngOnInit() {
      this.OpenLogin();
}
OpenLogin(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = "400px";
  this.dialog.open(SigninComponent,dialogConfig);
}
Logout(){
  this.service.logOut();
  this.OpenLogin();
}
// convenience getter for easy access to form fields




}


