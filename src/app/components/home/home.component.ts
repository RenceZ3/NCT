import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { CassandraDatastaxService } from '../../services/cassandra-datastax.service';
import { DocumentCassandraService } from '../../services/document-cassandra.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  studentName: string | undefined;
  studentFname: string | undefined;

  constructor(private _shared: SharedDataService, private _astra: CassandraDatastaxService, private _astra_doc: DocumentCassandraService) {
  }

  ngOnInit(): void {
    this.getStudentName();
    this.getProductList();
  }

  getStudentName() {
    let studentName: string | undefined;
    const data = this._astra.getStudentDetails().subscribe(result => {
      studentName = this._shared.getStudentUsername();
      return result.filter(student => {
        if(student.stud_username === studentName) {
          this.studentFname = student.stud_fname;
        }
      });
      
    });    
  }

  getProductList() {
    this._astra_doc.getProductList().subscribe(product => {
      console.log(product);
      
    })
  }

}
