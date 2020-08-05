import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserData } from 'src/app/models/userData';
import { PlaningList } from 'src/app/models/planingList';
import { TableColumn } from 'src/app/models/tableColumn';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Planing } from 'src/app/models/planing';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  userData: UserData;
  planingList: PlaningList;
  tableColumns: TableColumn [] = [{
    keyword: 'title',
    title: 'Title',
    placeholder: 'Filter by Title',
    formControlName: 'title',
  }, {
    keyword: 'description',
    title: 'Description'
  }, {
    keyword: 'status',
    title: 'Status',
    placeholder: 'Filter by Status',
    formControlName: 'status',
  }, {
    keyword: 'date',
    title: 'Date',
    placeholder: 'Filter by Date',
    formControlName: 'date',
  }, {
    keyword: 'place_name',
    title: 'Place name',
    placeholder: 'Filter by Place name',
    formControlName: 'place_name',
  }, {
    keyword: 'address',
    title: 'Address',
    placeholder: 'Filter by Address',
    formControlName: 'address',
  }];
  statuses = ['Done', 'Doing', 'Passed', 'ToDo'];
  filterForm: FormGroup;
  formSubscription;
  filterValue: Planing;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.generateFormsForFilter();
  }

  ngOnInit(): void {
    this.getUserData();
    this.getPlaningList();
  }

  ngOnDestroy(): void {
    this.formSubscription();
  }

  getUserData(): void {
    this.userData = this.authService.userData;
  }

  getPlaningList(): void {
    this.userService.getPlaningList().subscribe(data => {
      this.planingList = data;
      console.log(this.planingList);
      console.log(JSON.stringify(new Date()));
    });
  }

  generateFormsForFilter(): void {
    this.filterForm = this.fb.group({
      title: '',
      status: null,
      date: '',
      place_name: '',
      address: '',
      description: ''
    });
    this.formSubscription = this.filterForm.valueChanges.subscribe((data: Planing) => {
      this.filterValue = data;
    });
  }
}
