import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { CreateQuestionComponent } from '../create-question/create-question.component';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { HttpHeaders } from '@angular/common/http';
import { UpdateQuestionComponent } from '../update-question/update-question.component';
@Component({
  selector: 'app-tasksheetspecific',
  templateUrl: './tasksheetspecific.component.html',
  styleUrls: ['./tasksheetspecific.component.scss']
})
export class TasksheetspecificComponent implements OnInit {
  [x: string]: any;

  displayedColumns: string[] = ['TaskTypeId', 'Question', 'actions'];
  dataSource: any = [];
  bigTaskCollection: any = [];
  TaskSheetId: number;
  constructor(private serviceS: SharedService, 
              private dialog: MatDialog, 
              private router: Router,
              private snackBar: MatSnackBar) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      TaskSheetId: number
    };
    this.TaskSheetId = state.TaskSheetId;
  }
  openSnackBar(message) {
    this.snackBar.open(''+message+'', '' ,{
      duration: 2 * 1000,
    });
  }
  ngOnInit(): void {
    this.refreshTaskSheetoverview();
  }
  refreshTaskSheetoverview() {
    this.serviceS.getTaskCollection().subscribe(data => {
      data.forEach(element => {
        var Type = parseInt(element.TaskTypeId);
        switch (Type) {
          case Type = 1:
            element.TaskTypeId = "MultipleChoice"
            break;
          case Type = 2:
            element.TaskTypeId = "Freitext"
            break;
        }
      });
      console.log(data)
      this.bigTaskCollection = data;
    });
    this.sleep(250);
    var id = new Number(this.TaskSheetId);
    console.log("Die TaskSheetId die asugewält wurde",id);
    this.serviceS.getTaskInSheet(id).subscribe(data => {
      console.log(data);
      this.dataSource = this.bigTaskCollection.filter(
        n => data.some(n2 => n.TaskId == n2.TaskId));

    });
  }

  editLoad(TaskId,TaskTypeId) { // genau diese Frage laden 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    var datad = {
      TaskSheetId: this.TaskSheetId,
      TasktypeId: (TaskTypeId =="Freitext") ? 2: (TaskTypeId =="MultipleChoice") ? 1: 3,
      TaskId: TaskId
    };
    dialogConfig.data = datad;
    this.dialog.open(UpdateQuestionComponent, dialogConfig).afterClosed()
      .subscribe(() => this.refreshTaskSheetoverview());;
  }

  NewQuestion() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    var datad = {
      TaskSheetId: this.TaskSheetId
    };
    dialogConfig.data = datad;
    this.dialog.open(CreateQuestionComponent, dialogConfig).afterClosed()
      .subscribe(() => this.refreshTaskSheetoverview());;
  }

  deleteClick(TaskId){
    // delete task in sheet table aslo nur ref zu dem blatt
    console.log(TaskId);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        TaskSheetId: this.TaskSheetId,
        TaskId: TaskId
      },
    };
    this.serviceS.deleteAllTasksInSheet(options).subscribe(result => {
      this.openSnackBar(result.toString());
      this.refreshTaskSheetoverview();
    });
    //
    // Optional noch die Frage aus der Db löschen
  }
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
}
