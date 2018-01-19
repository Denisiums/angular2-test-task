import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CompanyComponent} from './components/pages/company/company.component';
import {DepartmentComponent} from './components/pages/department/department.component';
import {MemberComponent} from './components/pages/member/member.component';
import {MemberAddComponent} from './components/pages/member-add/member-add.component';
import {PageNotFoundComponent} from './components/pages/page-not-found/page-not-found.component';

const routes: Routes = [

  {path: '', redirectTo: 'departments', pathMatch: 'full'},
  {path: 'departments', component: CompanyComponent, pathMatch: 'full'},
  {path: 'departments/:departmentId', component: DepartmentComponent,
    children: [
      {path: '', component: MemberComponent, pathMatch: 'full'},
      {path: 'member/add', component: MemberAddComponent, pathMatch: 'full'},
      {path: 'member/:memberId', component: MemberComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
