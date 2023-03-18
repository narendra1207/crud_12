import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  [x: string]: any;

  fressnesList:string[]=['Brand New ' , 'Second Hand ', 'Refurbished']
productForm !: FormGroup;
actionBtn:string="Save"
  constructor( private _fb:FormBuilder ,
     private _apiservice:ApiService ,
     @Inject(MAT_DIALOG_DATA ) public editData:any ,
      private _dialogref:MatDialogRef<DialogComponent>){}

  ngOnInit():void{
    this.productForm=this._fb.group({
      productName:['', Validators.required],
      category :['', Validators.required],
      freshness:['', Validators.required],
      price:['', Validators.required],
      comment:['', Validators.required],
      date :['', Validators.required]

    
    })
    // this.addProduct();
    // console.log(this.editData)
    if(this.editData){
      this.actionBtn="Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);

    }
    
  }

  addProduct(){
    // console.log(this.productForm.value)

    if(!this.editData){
      if(this.productForm.valid){
        this._apiservice.postProduct(this.productForm.value) 
        .subscribe({
          next:(res)=>{
            alert("product added successfully")
            this.productForm.reset();
            this._dialogref.close('save')
          } , 
          error:()=>{
            alert("Error while adding the product")
          }
        })
      }
    }
    else{
      this.updateProduct()
    }
   
  }
  updateProduct(){
    this._apiservice.putProduct(this.productForm.value , this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Update Product Successfuly");
        this.productForm.reset();
        this._dialogref.close('update')
      } , 
      error:()=>{
        alert("Errror occured while updating ")
      }
    })
  }
}
// function updateProduct() {
//   throw new Error('Function not implemented.');
// }

