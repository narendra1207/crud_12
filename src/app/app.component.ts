import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular_crud';

  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginators!: MatPaginator;
  @ViewChild(MatSort) sorts!: MatSort;

  constructor(private _dialog: MatDialog, private _apiService: ApiService) { }

  ngOnInit() {
    this.getAllProducts()
  }

  openDialog() {
    this._dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val =>{
      if(val==="save"){
        this.getAllProducts()
      }
    });
  }

  getAllProducts() {
    this._apiService.getProducts()
      .subscribe({
        next: (res) => {
          // console.log(res)
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginators;
          this.dataSource.sort = this.sorts;
        },
        error: (err) => {
          alert('error has occured while fetching records !!' + err)
        }
      })
  }

  editProduct(row:any){
    this._dialog.open(DialogComponent, {
      width: '30%',
      data:row,
    }).afterClosed().subscribe(val=>{
      if(val==="update"){
        this.getAllProducts()
      }
    });

  }
  deleteProducts(id:number){
    this._apiService.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert("Product Deleted Successfully");
        this.getAllProducts()
      }, 
      error:()=>{
        alert(" Error While Deleting ")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

