import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SharedService } from './shared.service';
import { SigninService } from './modules/signin.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksheetoverviewComponent } from './modules/tasksheetoverview/tasksheetoverview.component';
import { TasksheetspecificComponent } from './modules/tasksheetspecific/tasksheetspecific.component';
import { SigninComponent } from './modules/signin/signin.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs';
import { CreateTaskSheetComponent } from './modules/create-task-sheet/create-task-sheet.component';
import { CreateQuestionComponent } from './modules/create-question/create-question.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UpdateQuestionComponent } from './modules/update-question/update-question.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksheetoverviewComponent,
    TasksheetspecificComponent,
    SigninComponent,
    CreateTaskSheetComponent,
    CreateQuestionComponent,
    UpdateQuestionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule,

  ],
  providers: [SharedService, SigninService],
  bootstrap: [AppComponent],
  entryComponents: [SigninComponent,CreateQuestionComponent,CreateTaskSheetComponent,UpdateQuestionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

