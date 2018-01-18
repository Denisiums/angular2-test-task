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
    console.log('Company component');
    this.getCompany();
    this.getDepartmentsList();
  }

  private getCompany(): void {
    this.companiesService.getCompany()
      .then((company: ICompany) => {
        console.log('received company: ', company);
        this.company = company;
        return company;
      })
      .catch((err: Error) => {
        console.log('received company error: ', err);
        this.networkError = true;
        return false;
      })
      .then(() => {
        this.pending.company = false;
      });
  }

  private getDepartmentsList(): void {
    this.departmentsService.getDepartmentsList()
      .then((list: IDepartmentShort[]) => {
        console.log('received departments list: ', list);
        this.departmentsList = list;
        return list;
      })
      .catch((err: Error) => {
        console.log('received departments list error: ', err);
        this.networkError = true;
        return false;
      })
      .then(() => {
        this.pending.departments = false;
      });
  }

}
