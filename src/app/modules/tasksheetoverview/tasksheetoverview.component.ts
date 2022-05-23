import { Component, OnInit,ViewChild  } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from 'src/app/shared.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { CreateTaskSheetComponent } from '../create-task-sheet/create-task-sheet.component';
import { taskSheet } from '../taskSheet.model';
import { SigninService } from '../signin.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-tasksheetoverview',
  templateUrl: './tasksheetoverview.component.html',
  styleUrls: ['./tasksheetoverview.component.scss']
})

export class TasksheetoverviewComponent implements OnInit {
  
  displayedColumns: string[] = ['TaskSheetName', 'SubjectName', 'actions'];
  dataSource: taskSheet[];
  LogedId: number;
  constructor(private router: Router,
              private serviceS: SharedService, 
              private dialog: MatDialog, 
              private service: SigninService,
              private snackBar: MatSnackBar,) {
    
  }

  ngOnInit(): void { 
    this.service.getLogedId().subscribe((value) => {
      this.LogedId = value;
      this.refreshTaskSheetoverview();
    });
  }

  openSnackBar(message) {
    this.snackBar.open(''+message+'', '' ,{
      duration: 2 * 1000,
    });
  }

  refreshTaskSheetoverview() {
    console.log(this.LogedId);
    this.serviceS.getTaskSheetList(this.LogedId).subscribe(data => {
      this.dataSource = data;
      console.log(this.dataSource)
    }
    );
  }


  OpenWorkSheetForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    this.dialog.open(CreateTaskSheetComponent, dialogConfig).afterClosed()
      .subscribe(() => this.refreshTaskSheetoverview());;
  }
  NavigateToQuestions(element){
    const navigationExtras: NavigationExtras = {
      state: {
        TaskSheetId: element
      }};
    this.router.navigateByUrl("/TaskSheetSpecificComponent", navigationExtras);
  }
  ondisable(element) {
    console.log(element);
    this.serviceS.deleteTaskSheet(element).subscribe(result => {
      this.openSnackBar(result.toString());
      this.refreshTaskSheetoverview();
    });

    /*console.log(element.TaskSheetId.value)
    var z= parseInt(element.TaskSheetId.value);
    
    if(confirm('Are you sure??')){
      this.service.deleteTaskSheet(z).subscribe(data=>{
        alert(data.toString());
      })
    }*/
    
  }

}
