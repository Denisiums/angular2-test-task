import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import { CompanyComponent } from './components/company/company.component';
import { DepartmentComponent } from './components/department/department.component';
import { MemberComponent } from './components/member/member.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import {
  CompaniesService,
  DepartmentsService,
  SharedService,
  MembersService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    DepartmentComponent,
    MemberComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CompaniesService,
    DepartmentsService,
    SharedService,
    MembersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
