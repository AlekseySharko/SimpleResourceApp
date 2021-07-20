import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ResourceProviderService} from "./services/resource-provider.service";
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Resource} from "./classes/resource";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {FormResourceComponent} from "./form-resource/form-resource.component";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['value', 'controls'];
  dataSource!: MatTableDataSource<Resource>;
  resourcesSubscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private resourceProvider: ResourceProviderService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.onChange();
  }
  ngOnDestroy(): void {
    this.resourcesSubscription.unsubscribe();
  }

  onChange() {
    this.resourcesSubscription = this.resourceProvider.getResources().subscribe(data => {
      this.dataSource = new MatTableDataSource<Resource>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onAddResource(){
    const dialogRef = this.dialog.open(FormResourceComponent, {
      width: '40rem',
      minWidth: '20rem',
      data: { isEdit: false }
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.onChange();
      }
    });
  }
}
