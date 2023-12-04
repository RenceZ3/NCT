import { Component, OnInit } from '@angular/core';
import { CassandraDatastaxService } from '../../services/cassandra-datastax.service';
import { v4 as uuid } from 'uuid';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnInit{
  private studData: any;
  private imageData: any;
  private listStudent: any = [];
  imageSource: any;
  

  constructor(private _astra: CassandraDatastaxService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
    this._astra.getStudentDetails().subscribe((result) => {
      this.listStudent = result;
      console.log(this.listStudent);
      
      // this.convertImageBlob(this.listStudent[3].image.data);
    });
  }

}
