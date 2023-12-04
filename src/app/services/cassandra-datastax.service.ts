import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CassandraDatastaxService {
  private options: Object = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': "GET, PUT, POST, DELETE, HEAD, OPTIONS",
      'X-Cassandra-Token': environment.SECRET_TOKEN,
    })
  }

  constructor(private http: HttpClient) { }

  getStudentDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.PRIMARY_LINK}/get-student`, this.options);
  }

  insertStudentDetails(data: {studid: string, fname: string, lname: string, uname: string, pass: string, image: any }): Observable<any> {
    const formdata = new FormData();
    formdata.append('studid', data.studid);
    formdata.append('stud_fname', data.fname);
    formdata.append('stud_lname', data.lname);
    formdata.append('stud_password', data.pass);
    formdata.append('stud_username', data.uname);
    formdata.append('image', data.image);
    return this.http.post<any>(`${environment.PRIMARY_LINK}/insert-student`, formdata, this.options);
  }
}
