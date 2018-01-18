import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CompanyComponent} from './components/company/company.component';
import {DepartmentComponent} from './components/department/department.component';
import {MemberComponent} from './components/member/member.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [

  {path: '', redirectTo: 'departments', pathMatch: 'full'},
  {path: 'departments', component: CompanyComponent, pathMatch: 'full'},
  {path: 'departments/:departmentId', component: DepartmentComponent,
    children: [
      {path: '', component: MemberComponent, pathMatch: 'full'},
      {path: 'member/add', component: MemberComponent, pathMatch: 'full'},
      {path: 'member/:memberId', component: MemberComponent}
    ]
  },
  // {path: 'departments/:departmentId/member/:memberId', component: MemberComponent, pathMatch: 'full'},
  // {path: 'departments/:departmentId/member', component: MemberComponent},
  // {path: 'departments/:departmentId/add-member', component: MemberComponent},
  // {path: 'departments/:departmentId/member/', component: MemberLayoutComponent,

  // },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
