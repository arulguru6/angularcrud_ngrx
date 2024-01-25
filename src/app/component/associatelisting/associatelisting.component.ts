import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associates } from 'src/app/Store/Model/Associate.model';
import { getAssociateList } from 'src/app/Store/Associate/Associate.Selector';
import { loadAssociate } from 'src/app/Store/Associate/Associate.Action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css']
})
export class AssociatelistingComponent implements OnInit {

  AssociateList!: Associates[];
  dataSource: any;

  displayedColums: string[] = ["code", "name", "email", "phone", "address", "type", "group", "status", "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private store: Store) {

  }
  ngOnInit(): void {
    this.store.dispatch(loadAssociate());
    this.store.select(getAssociateList).subscribe(item => {
      this.AssociateList = item;
      this.dataSource = new MatTableDataSource<Associates>(this.AssociateList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  FunctionEdit(id: number) { }
  FunctionDelete(id: number) { }

  FunctionAdd() {
    this.OpenPopup(0, 'Create Associate')
  }

  OpenPopup(code: number, title: string) {
    this.dialog.open(AddassociateComponent, {
      width: '50%', enterAnimationDuration: '1000ms', exitAnimationDuration: '1000ms',
      data: {
        code: code,
        title: title
      }
    })
  }
}
