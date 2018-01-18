import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services';
import { ICompany } from '../../interfaces';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor(private companiesService: CompaniesService) { }

  ngOnInit() {
    this.companiesService.getCompany()
      .then((company: ICompany) => {
      console.log('received company: ', company);
    })
      .catch((err: Error) => {
        console.log('received error: ', err);
      });
  }

}
