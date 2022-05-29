import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { CreateTaskSheetComponent } from '../create-task-sheet/create-task-sheet.component';
import { taskSheet } from '../taskSheet.model';
import { SigninService } from '../signin.service';
import { NavigationExtras, Router } from '@angular/router';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

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
    this.snackBar.open('' + message + '', '', {
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
  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  OpenWorkSheetForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    this.dialog.open(CreateTaskSheetComponent, dialogConfig).afterClosed()
      .subscribe(() => this.refreshTaskSheetoverview());;
  }
  NavigateToQuestions(element) {
    const navigationExtras: NavigationExtras = {
      state: {
        TaskSheetId: element
      }
    };
    this.router.navigateByUrl("/TaskSheetSpecificComponent", navigationExtras);
  }
  ondisable(element) {
    console.log(element);
    this.serviceS.deleteTaskSheet(element).subscribe(result => {
      this.openSnackBar(result.toString());
      this.refreshTaskSheetoverview();
    });

  }
  async onExport(row) {
    var options = {
      fieldSeparator: ' ; ',
      quoteStrings: "'",
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: row.TaskSheetName,
      useBom: true,
      noDownload: false,
      headers: [],
      useHeader: false,
      nullToEmptyString: true,
    };

    let csvdata = await this.getCsvData(row);
    console.log(csvdata)
    let newcsv =new AngularCsv(csvdata, "" + row.TaskSheetName + "", options);
    console.log(newcsv.getCsvData())
    
  }

  async getCsvData(row) {
    var data = [];
    let mult= await new Promise((resolve,reject) =>{ // Multiplechoice
      this.serviceS.getCsvData(row.TaskSheetId, 1).subscribe(result => {
        
        result.forEach(function (item) {
          data.push(item);
        })
        if(1>0){
          resolve(data)
        }else {
          reject("L")
        }
      })
    })  as Array<any>;

    console.log(mult)
    let ft= await new Promise((resolve,reject) =>{ // Freitext
        this.serviceS.getCsvData(row.TaskSheetId, 2).subscribe(result => {
        var data = [];
        result.forEach(function (item) {
          data.push(item);
        })
        if(1>0){
          resolve(data)
        }else {
          reject("L")
        }
      });

    }) as Array<any>;

    let csvdata= [];
    let ftheaders = ["$","Freitext"];
    let ftheaders2 = ['Question','Answer','TaskTip'];
    csvdata.push(ftheaders);
    csvdata.push(ftheaders2);
    ft.forEach(function (item){
      csvdata.push(item)
    })
    let multheaders = ["$","Multiplechoice"];
    let multheaders2 = ['Question','Rightanswer','Wronganswer1','Wronganswer2','Wronganswer3']
    csvdata.push(multheaders);
    csvdata.push(multheaders2);
    mult.forEach(function (item){
      csvdata.push(item)
    })
    return csvdata ;
  }
  /*console.log(element.TaskSheetId.value)
  var z= parseInt(element.TaskSheetId.value);
  
  if(confirm('Are you sure??')){
    this.service.deleteTaskSheet(z).subscribe(data=>{
      alert(data.toString());
    })
  }*/

}


