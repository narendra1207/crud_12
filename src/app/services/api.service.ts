import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  postProduct(data:any){
   return this._http.post<any>("http://localhost:3000/productlist/" , data)
  }

  getProducts(){
    return this._http.get<any>("http://localhost:3000/productlist/")
  }

  putProduct(data:any , id:number){
    return this._http.put<any>("http://localhost:3000/productlist/" +id , data)
  }

  deleteProduct(id:number){
    return this._http.delete<any>("http://localhost:3000/productlist/"+id)
  }
}
