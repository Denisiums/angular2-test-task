import { Component, OnInit } from '@angular/core';
import { CompaniesService, DepartmentsService } from '../../../services';
import { ICompany, IDepartmentShort } from '../../../interfaces';

interface ICompanyPagePending {
  departments: boolean;
  company: boolean;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  public company: ICompany;
  public departmentsList: IDepartmentShort[];
  public networkError: boolean = false;
  public pending: ICompanyPagePending = {
    departments: false,
    company: false
  };

  constructor(private companiesService: CompaniesService, private departmentsService: DepartmentsService) { }

  ngOnInit() {
    this.getCompany();
    this.getDepartmentsList();
  }

  private getCompany(): void {
    if (this.pending.company) {
      return;
    }

    this.pending.company = true;
    this.companiesService.getCompany()
      .then((company: ICompany) => {
        this.company = company;
        return company;
      })
      .catch((err: Error) => {
        this.networkError = true;
        return false;
      })
      .then(() => {
        this.pending.company = false;
      });
  }

  private getDepartmentsList(): void {
    if (this.pending.departments) {
      return;
    }

    this.pending.departments = true;
    this.departmentsService.getDepartmentsList()
      .then((list: IDepartmentShort[]) => {
        this.departmentsList = list;
        return list;
      })
      .catch((err: Error) => {
        this.networkError = true;
        return false;
      })
      .then(() => {
        this.pending.departments = false;
      });
  }

}
