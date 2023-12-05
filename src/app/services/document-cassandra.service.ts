import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentCassandraService {
  private options: Object = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': "GET, PUT, POST, DELETE, HEAD, OPTIONS",
      'X-Cassandra-Token': environment.SECRET_TOKEN
    })
  }

  constructor(private http: HttpClient) { }

  getProductList(): Observable<any[]>  {
    return this.http.get<any[]>(`${environment.DOCUMENT_LINK}`, this.options);
  }
}
