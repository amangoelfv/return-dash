import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnIdToNameMap } from './app.enum';
import { IReturn, ITableColumn } from './app.interface';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  ColumnIdToNameMap = ColumnIdToNameMap;
  isLoading: boolean = true;
  startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  endDate = new Date(Date.now());
  displayColumns: string[] = [];
  displayColumnsAccessor: any = [];
  returnsDataSource = new MatTableDataSource<IReturn>([]);
  range = new FormGroup({
    start: new FormControl(this.startDate, Validators.required),
    end: new FormControl(this.endDate, Validators.required),
  });
  constructor(private appService: AppService) {
    this.displayColumns = Object.keys(ColumnIdToNameMap);
    Object.assign(this.displayColumnsAccessor, ColumnIdToNameMap);
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, {
    static: false,
  })
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.returnsDataSource.sort = this.sort;
    this.returnsDataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.fetchData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.returnsDataSource.filter = filterValue.trim().toLowerCase();
  }
  fetchData() {
    this.isLoading = true;
    this.appService
      .getReturnsData(
        this.range.value.start.toUTCString(),
        this.range.value.end.toUTCString()
      )
      .subscribe((data) => {
        this.returnsDataSource.data = data;
      })
      .add(() => {
        this.isLoading = false;
      });
  }
}
