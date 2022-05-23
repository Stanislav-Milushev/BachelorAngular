import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/modules/signin.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  LogedFirstname: string;
  LogedEmail:string;
  LogedLastName: string;
  LogedId: number;
  constructor(  private service: SigninService) { }
  
  ngOnInit() {
    this.service.getLogedEmail().subscribe((value) => {
      this.LogedEmail = value;
    });
    this.service.getLogedFirstname().subscribe((value) => {
      this.LogedFirstname = value;
    });
    this.service.getLogedLastName().subscribe((value) => {
      this.LogedLastName = value;
    });
    this.service.getLogedId().subscribe((value) => {
      this.LogedId = value;
    });
  }
 
}
