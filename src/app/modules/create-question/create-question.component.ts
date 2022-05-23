import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { FTTaskModel } from '../FTTaskForm.model';
import { MCTaskModel } from '../MCTaskFrom.model';
import { SigninService } from '../signin.service';
import { TaskCollectionModel } from '../TaskCollectionForm.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    public fb: FormBuilder,
    private service: SigninService,
    private serviceS: SharedService,
    private dialogRef: MatDialogRef<CreateQuestionComponent>) { }

  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  openSnackBar(message) {
    this.snackBar.open('' + message + '', '', {
      duration: 2 * 1000,
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.service.MCfrom.reset();
    this.service.FTfrom.reset();
    console.log("Dialog bekommt diese TaskSheetId ", this.data)
  }
  async onSubmit() {
    switch (true) {
      // case MC TASK=====================================================================
      case this.service.MCfrom.valid:
        var MultList = new Array<MCTaskModel>();
        var mctask = new MCTaskModel();
        mctask.MCTaskId = 0;
        mctask.Rightanswer = this.service.MCfrom.controls['Rightanswer'].value;
        mctask.Wronganswer1 = this.service.MCfrom.controls['Wronganswer1'].value;
        mctask.Wronganswer2 = this.service.MCfrom.controls['Wronganswer2'].value;
        mctask.Wronganswer3 = this.service.MCfrom.controls['Wronganswer3'].value;
        console.log("So sieht der MCTaskTable eintrag aus ", mctask)
        // Task in der MC TAbelle hinzufügen
        this.serviceS.addMultTask(mctask).subscribe(result => {
          console.log(result.toString());
        });
        await this.delay(250);
        // Die specific id herausfinden um sie der collection hinzuzufuegen
        this.serviceS.getMultList().subscribe(data => {
          MultList = data;
          console.log("Die Multiliste nach dem hinzufuegen der neuen Task", MultList);

        });
        await this.delay(250);
        var specificid;
        MultList.forEach(function (item) {
          if (item.Rightanswer == mctask.Rightanswer
            && item.Wronganswer1 == mctask.Wronganswer1
            && item.Wronganswer2 == mctask.Wronganswer2
            && item.Wronganswer3 == mctask.Wronganswer3) {
            specificid = item.MCTaskId;
            console.log("Die specific Id fuer die collection", specificid)
          }
        });

        //Task in der Collection Hinzufuegen
        var taskcollection = new TaskCollectionModel();
        taskcollection.TaskId = 0;
        taskcollection.TaskTypeId = 1;
        taskcollection.SpecificTaskId = specificid; // id from new mc task
        taskcollection.Question = this.service.MCfrom.controls['Question'].value;
        this.serviceS.addTaskCollection(taskcollection).subscribe(result => {
          console.log(result.toString());
        });
        await this.delay(250);
        // Task aus der Collection der richtigen sheet zuordnen

        var headers = new HttpHeaders({
          'Content-Type': 'application/json',
        })
        var body = {
          TaskSheetId: this.data.TaskSheetId,
          TaskId: 69
        }
        this.serviceS.getTaskCollection().subscribe(result => {
          result.forEach(function (item) {
            if (item.TaskTypeId == taskcollection.TaskTypeId
              && item.SpecificTaskId == taskcollection.SpecificTaskId
              && item.Question == taskcollection.Question) {
              body.TaskId = item.TaskId
              console.log("die Collection nach dem hinzufuegen", result);
            }
          });
        });

        await this.delay(250);
        this.serviceS.addTaskInSheet(body, headers).subscribe(result => {
          this.openSnackBar(result);
          this.closeDialog();
        });
        break;
      // case FT TASK=====================================================================
      case this.service.FTfrom.valid:
        var FTList = new Array<FTTaskModel>();
        var fttask = new FTTaskModel();
        fttask.Answer = this.service.FTfrom.controls['Answer'].value;
        fttask.TaskTip = this.service.FTfrom.controls['TaskTip'].value;
        console.log(fttask)
        // Task anteil in der FTTask Tabelle hunzufuegen
        this.serviceS.addFTTask(fttask).subscribe(result => {
          console.log(result.toString());
        });
        await this.delay(250);
        // Speciffic taskid fuer die collection herausfinden
        this.serviceS.getFTList().subscribe(data => {
          FTList = data;
          console.log(FTList);

        });
        await this.delay(250);
        var specificid;
        FTList.forEach(function (item) {
          if (item.Answer == fttask.Answer
            && item.TaskTip == fttask.TaskTip) {
            specificid = item.FTTaskId;
            console.log(specificid)
          }
        });
        //Task in der Collection Hinzufuegen
        var taskcollection = new TaskCollectionModel();
        taskcollection.TaskId = 0;
        taskcollection.TaskTypeId = 2; // 1= MCTASk 2= FTTask
        taskcollection.SpecificTaskId = specificid; // id from new ft task
        taskcollection.Question = this.service.FTfrom.controls['Question'].value;
        this.serviceS.addTaskCollection(taskcollection).subscribe(result => {
          console.log(result.toString());
        });
        await this.delay(250);
        // Task aus der Collection der richtigen sheet zuordnen
        var headers = new HttpHeaders({
          'Content-Type': 'application/json',
        })
        var body = {
          TaskSheetId: this.data.TaskSheetId,
          TaskId: 69
        }
        this.serviceS.getTaskCollection().subscribe(result => {
          result.forEach(function (item) {
            if (item.TaskTypeId == taskcollection.TaskTypeId
              && item.SpecificTaskId == taskcollection.SpecificTaskId
              && item.Question == taskcollection.Question) {
              body.TaskId = item.TaskId
              console.log(result);
            }
          });
        });
        await this.delay(250);
        this.serviceS.addTaskInSheet(body, headers).subscribe(result => {
          this.openSnackBar(result);
          this.closeDialog();
        });
        break;
    }
  }
}


