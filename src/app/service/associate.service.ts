import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associates } from '../Store/Model/Associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  baseurl = 'http://localhost:3000/associate';

  constructor(private http: HttpClient) {

  }

  GetAllAssociate() {
    return this.http.get<Associates[]>(this.baseurl);
  }

  GetAssociateByCsode(code: number) {
    return this.http.get<Associates>(this.baseurl + '/' + code);
  }

  DeleteAssociate(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }

  UpdateAssociate(data: Associates) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }

  CreateAssociate(data: Associates) {
    return this.http.post(this.baseurl, data);
  }
}
