import { Component, OnInit } from '@angular/core';
import { CassandraDatastaxService } from '../../services/cassandra-datastax.service';
import { v4 as uuid } from 'uuid';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedDataService } from '../../services/shared-data.service';


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
  studentUsername: string | undefined;
  

  constructor(private _astra: CassandraDatastaxService, private sanitizer: DomSanitizer, private _shared: SharedDataService) {}

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
    let studId = '';
    
    this._astra.getStudentDetails().subscribe((result) => {
      this.listStudent = result;
      this.studentUsername =this.studentUsername = this._shared.getStudentUsername();

      result.filter(student => {
        if(student.stud_username === this.studentUsername) {
          studId = student.studid;          
          this._astra.getStudent(studId).subscribe(res => {
            this.convertImageBlob(res[0].image.data);
          });
        }
      });
    });
  }

  convertImageBlob(image: Uint8Array) {
    const blob = new Blob([new Uint8Array(image)], { type: 'image/jpeg'});
    const urlCreator = window.URL || window.webkitURL;
    const imageURL = urlCreator.createObjectURL(blob);
    // const imgURL = URL.createObjectURL(blob);
    this.imageSource = this.sanitizer.bypassSecurityTrustUrl(imageURL);
  }

}
