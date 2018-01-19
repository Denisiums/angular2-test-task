import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  CompaniesService,
  DepartmentsService,
  SharedService,
  HelpersService,
  MembersService
} from './services';

import { AppComponent } from './components/app/app.component';
import { CompanyComponent } from './components/pages/company/company.component';
import { DepartmentComponent } from './components/pages/department/department.component';
import { MemberComponent } from './components/pages/member/member.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { AppHeaderComponent } from './components/elements/app-header/app-header.component';
import { MemberAddComponent } from './components/pages/member-add/member-add.component';
import { SkillEditorComponent } from './components/elements/skill-editor/skill-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    DepartmentComponent,
    MemberComponent,
    PageNotFoundComponent,
    AppHeaderComponent,
    MemberAddComponent,
    SkillEditorComponent
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
    HelpersService,
    MembersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
