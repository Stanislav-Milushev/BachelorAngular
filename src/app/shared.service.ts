import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://localhost:32508/api";

  constructor(private http: HttpClient) { }
  //MultipleChoise methods ========================================
  getMultList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/mctask');
  }
  addMultTask(val: any) {
    return this.http.post(this.APIUrl + '/mctask', val);
  }
  updateMultTask(val: any) {
    return this.http.put(this.APIUrl + '/mctask', val);
  }
  deleteMultTask(val: any) {
    return this.http.delete(this.APIUrl + '/mctask', val);
  }
  //FreeText methods ========================================
  getFTList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/fttask');
  }
  addFTTask(val: any) {
    return this.http.post(this.APIUrl + '/fttask', val);
  }
  updateFTTask(val: any) {
    return this.http.put(this.APIUrl + '/fttask', val);
  }
  deleteFTTask(val: any) {
    return this.http.delete(this.APIUrl + '/fttask', val);
  }
  //Tasksheet methods ========================================
  getTaskSheetList(val: any): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/tasksheet/' + val);
  }
  addTaskSheet(val: any) {
    return this.http.post(this.APIUrl + '/tasksheet', val);
  }
  deleteTaskSheet(val: any) {
    return this.http.delete(this.APIUrl + '/tasksheet/' + val);
  }
  //Task In Sheet methods ========================================
  getTaskInSheet(val: any): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/taskinsheet/' + val);
  }
  addTaskInSheet(body: any, header: any) {
    return this.http.put(this.APIUrl + '/taskinsheet', body, header);

  }
  deleteAllTasksInSheet(val: any) {
    return this.http.delete(this.APIUrl + '/taskinsheet', val);
    /*const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        TaskSheetId: element,
      },
    };

    this.serviceS.deleteAllTasksInSheet(options).subscribe(result => {
      alert(result.toString());

    });*/
  }
  deleteTaskInSheet(val: any) {
    return this.http.delete(this.APIUrl + '/taskinsheet/' + 1, val);
  }
  //TaskCollection methods ========================================
  getTaskCollection(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/taskcollection/' + 1);
  }
  addTaskCollection(val: any) {
    return this.http.post(this.APIUrl + '/taskcollection', val);
  }

  //User methods ========================================

  getUser(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/teacher');
  }
  addUser(val: any) {
    return this.http.post(this.APIUrl + '/teacher', val);
  }
  //CSV methods ========================================
  getCsvData(tasksheet: any,tasktype: any): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/csv/'+tasksheet+"/"+tasktype);
  }

}
