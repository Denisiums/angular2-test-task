import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService, MembersService, SharedService } from '../../../services';
import { IDepartment, IMemberShort } from '../../../interfaces';

interface IDepartmentPagePending {
  department: boolean;
  members: boolean;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  public department: IDepartment;
  public membersList: IMemberShort[];
  public networkError: boolean = false;
  public pending: IDepartmentPagePending = {
    department: false,
    members: false
  };

  private departmentId: string;

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private sharedService: SharedService,
    private membersService: MembersService) { }

  ngOnInit() {
    console.log('Company component');
    this.route.params.subscribe( params => {
      this.departmentId = params['departmentId'];
      console.log('params: ', params);
    });
    this.getDepartment();
    this.getMembersList();
  }

  private getDepartment(): void {
    if (!this.departmentId || this.pending.department) {
      return;
    }

    const departmentId: string = this.departmentId;
    this.pending.department = true;
    this.departmentsService.getDepartment(departmentId)
      .then((department: IDepartment) => {
        console.log('received department: ', department);
        this.department = department;
        this.sharedService.teamLeader = department.teamLeader;
        return department;
      })
      .catch((err: Error) => {
        console.log('received department error: ', err);
        this.networkError = true;
        return false;
      })
      .then(() => {
        this.pending.department = false;
      });
  }

  private getMembersList(): void {
    if (!this.departmentId || this.pending.members) {
      return;
    }

    const departmentId: string = this.departmentId;
    this.pending.members = true;
    this.membersService.getDepartmentMembersList(departmentId)
      .then((list: IMemberShort[]) => {
        console.log('received members list: ', list);
        this.membersList = list;
        return list;
      })
      .catch((err: Error) => {
        console.log('received members list error: ', err);
        this.networkError = true;
        return false;
      })
      .then(() => {
        this.pending.members = false;
      });
  }

}
