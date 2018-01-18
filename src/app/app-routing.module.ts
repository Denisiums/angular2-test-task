import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CompanyComponent} from './components/company/company.component';
import {DepartmentComponent} from './components/department/department.component';
import {MemberComponent} from './components/member/member.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [

  {path: '', redirectTo: 'departments', pathMatch: 'full'},
  {path: 'departments', component: CompanyComponent, pathMatch: 'full'},
  {path: 'departments/:id', component: DepartmentComponent,
    children: [
      {path: 'member/:id', component: MemberComponent},
    ]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
