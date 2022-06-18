import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { FTTaskModel } from '../FTTaskForm.model';
import { MCTaskModel } from '../MCTaskFrom.model';
import { SigninService } from '../signin.service';
import { TaskCollectionModel } from '../TaskCollectionForm.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit {
  selected = new FormControl(0);
  dataSource: any = [];
  TaskSheetId: number;
  TasktypeId: number;
  TaskId: number;
  SpecificTaskId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    public fb: FormBuilder,
    private service: SigninService,
    private serviceS: SharedService,
    private dialogRef: MatDialogRef<UpdateQuestionComponent>) { }

  ngOnInit() {

    this.service.MCfrom.reset();
    this.service.FTfrom.reset();
    console.log(this.data);
    this.TaskSheetId = this.data.TaskSheetId;
    this.TasktypeId = this.data.TasktypeId;
    this.TaskId = this.data.TaskId;
    console.log(this.TaskSheetId, this.TasktypeId, this.TaskId)
    this.loadQuestionInForm(this.TaskSheetId, this.TasktypeId, this.TaskId);
  }
  ngAfterContentInit() {
    if (this.TasktypeId == 2) {
      this.selected.setValue(2);
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }

  openSnackBar(message) {
    this.snackBar.open('' + message + '', '', {
      duration: 2 * 1000,
    });
  }

  async onSubmit() {
    switch (true) {
      // case MC TASK=====================================================================
      case this.service.MCfrom.valid:
        var updatemult = new MCTaskModel();
        updatemult.MCTaskId = this.SpecificTaskId;
        updatemult.Rightanswer = this.service.MCfrom.controls['Rightanswer'].value;
        updatemult.Wronganswer1 = this.service.MCfrom.controls['Wronganswer1'].value;
        updatemult.Wronganswer2 = this.service.MCfrom.controls['Wronganswer2'].value;
        updatemult.Wronganswer3 = this.service.MCfrom.controls['Wronganswer3'].value;
        this.serviceS.updateMultTask(updatemult).subscribe(data => {
          console.log(data)
        });
        var taskcollection = {
          TaskId: this.TaskId,
          TaskTypeId: this.TasktypeId,
          SpecificTaskId: this.SpecificTaskId,
          Question: this.service.MCfrom.controls['Question'].value
        };
        console.log(this.TaskId, taskcollection.TaskId)
        console.log(taskcollection.Question)
        this.serviceS.updateTaskCollection(taskcollection).subscribe(result => {
          console.log(result.toString());
          this.closeDialog();
        });

        break;
      // case FT TASK=====================================================================
      case this.service.FTfrom.valid:
        var updateFT = new FTTaskModel();
        updateFT.FTTaskId = this.SpecificTaskId;
        updateFT.Answer = this.service.FTfrom.controls['Answer'].value;
        updateFT.TaskTip = this.service.FTfrom.controls['TaskTip'].value;
        this.serviceS.updateFTTask(updateFT).subscribe(data => {
          console.log(data)
        });
        var taskcollection = {
          TaskId: this.TaskId,
          TaskTypeId: this.TasktypeId,
          SpecificTaskId: this.SpecificTaskId,
          Question: this.service.FTfrom.controls['Question'].value
        };
        this.serviceS.updateTaskCollection(taskcollection).subscribe(result => {
          console.log(result.toString());
          this.closeDialog();
        });
        break;
    }
  }

  loadQuestionInForm(TaskSheetId: any, TaskTypeId: number, TaskId: any) {
    console.log(TaskSheetId, TaskTypeId, TaskId);
    this.serviceS.getUpdateQuestionData(TaskSheetId, TaskTypeId, TaskId).subscribe(data => {
      if (TaskTypeId == 1) {
        console.log(data)
        this.service.MCfrom.controls['Question'].setValue(data[0].Question);
        this.service.MCfrom.controls['Rightanswer'].setValue(data[0].Rightanswer);
        this.service.MCfrom.controls['Wronganswer1'].setValue(data[0].Wronganswer1);
        this.service.MCfrom.controls['Wronganswer2'].setValue(data[0].Wronganswer2);
        this.service.MCfrom.controls['Wronganswer3'].setValue(data[0].Wronganswer3);
        this.SpecificTaskId = data[0].MCTaskId
        console.log(this.service.MCfrom.value)
      } else if (TaskTypeId == 2) {
        console.log(data)
        this.service.FTfrom.controls['Question'].setValue(data[0].Question);
        this.service.FTfrom.controls['Answer'].setValue(data[0].Answer);
        this.service.FTfrom.controls['TaskTip'].setValue(data[0].TaskTip);
        this.SpecificTaskId = data[0].FTTaskId
      }

      console.log(data);
      console.log(this.service.MCfrom)
      console.log(this.service.FTfrom)
    });

  }
}




