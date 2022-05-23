import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { SharedService } from 'src/app/shared.service';
import { SigninService } from '../signin.service';
interface Subject{
  name:string
}

@Component({
  selector: 'app-create-task-sheet',
  templateUrl: './create-task-sheet.component.html',
  styleUrls: ['./create-task-sheet.component.scss']
})
export class CreateTaskSheetComponent implements OnInit {
  LogedId: number;

  constructor(public fb: FormBuilder, 
              private service:SigninService, 
              private serviceS: SharedService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<CreateTaskSheetComponent>) { }

  subjects: Subject[] = [
    {name: 'English',},
    {name: 'Mathematik',},
    {name: 'Kunst',},
    {name: 'Socialwissenschafen',},
    {name: 'Geschichte',},
    {name: 'Musik',},
    {name: 'Erdkunde',},
    {name: 'Biologie',},
    {name: 'Chemie',},
    {name: 'Physik',},
  ];
  closeDialog(){
    this.dialogRef.close();
  }
  ngOnInit() {
    this.service.TaskSheetControl.reset();
    this.service.getLogedId().subscribe((value) => {
      this.LogedId = value;
    });
  }
  openSnackBar(message) {
    this.snackBar.open(''+message+'', '' ,{
      duration: 2 * 1000,
    });
  }
  onSubmit() {
    var words =JSON.stringify(this.service.TaskSheetControl.controls['TasksheetSubject'].value).split(':');
    var words2 =words[1].split(':');
    var SubjectName =words2[0].split('"');
    console.log(SubjectName)
    var newTaskSheet = {
      TaskSheetName: this.service.TaskSheetControl.controls['TaskSheetName'].value,
      SubjectName: SubjectName[1],
      TeacherId: this.LogedId
    }
    
   this.serviceS.addTaskSheet(newTaskSheet).subscribe(res=>{
    this.openSnackBar(res.toString());
    this.closeDialog();
    
  });
 
}
}