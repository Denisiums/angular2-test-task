import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CompanyComponent } from './components/company/company.component';
import { DepartmentComponent } from './components/department/department.component';
import { MemberComponent } from './components/member/member.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// import { CompanyService }

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
