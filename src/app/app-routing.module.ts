import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TasksheetoverviewComponent } from './modules/tasksheetoverview/tasksheetoverview.component';
import { TasksheetspecificComponent } from './modules/tasksheetspecific/tasksheetspecific.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'TaskSheetOverview',
    component: TasksheetoverviewComponent
  }, {
    path: 'TaskSheetSpecificComponent',
    component: TasksheetspecificComponent
  }
  ]
}];

@Component({ template: '' })
export class EmptyComponent { }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
