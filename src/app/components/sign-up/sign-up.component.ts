import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CassandraDatastaxService } from '../../services/cassandra-datastax.service';
import { DomSanitizer } from '@angular/platform-browser';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit, AfterViewInit{
  private studData: any;
  private imageData: any;
  imageSource: any;
  signupForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private router: Router, private formBuilder: FormBuilder, private _astra: CassandraDatastaxService, private sanitizer: DomSanitizer) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
      imageData: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      
  }

  ngAfterViewInit(): void {
      
  }

  signup() {
    const fname = this.signupForm.get('firstName')?.value;
    const lname = this.signupForm.get('lastName')?.value;
    const uname = this.signupForm.get('userName')?.value;
    const password1 = this.signupForm.get('password')?.value;
    const password2 = this.signupForm.get('rePassword')?.value;
    
    const fileInput = this.fileInput.nativeElement;
  
    if (fileInput && fileInput?.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
  
      console.log('File:', file);
  
      if (this.signupForm.valid && password1 === password2) {
        // this.convertImageBlob(file);
        this.router.navigate(['/login']);
        this.insertStudentData(fname, lname, uname, password1, file);
      }
    } else {
      console.log('No file selected');
    }
  }

  convertImageBlob(image: Uint8Array) {
    const blob = new Blob([new Uint8Array(image)]);
    const imgURL = URL.createObjectURL(blob);
    this.imageSource = this.sanitizer.bypassSecurityTrustUrl(imgURL);
  }
  // studid: string, fname: string, lname: string, uname: string, pass: string, image: any 
  insertStudentData(fname: string, lname: string,  uname: string, pass: string, image: File) {
    let dataInsert: any = {
      studid: uuid(),
      fname,
      lname,
      pass,
      uname,
      image
    }

    this._astra.insertStudentDetails(dataInsert).subscribe(res => {
      console.log(res, 'Data inserted!');
    });

    // console.log('dataaa', image);
  }

  onfileUploadImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const file : File = event.target.files[0];

    // if(file) {
    //   this.insertStudentData('','','','',file);
    // }
    console.log(file); 
  }
}
