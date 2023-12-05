import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CassandraDatastaxService } from '../../services/cassandra-datastax.service';
import { error } from 'console';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{
  loginForm!: FormGroup;
  idStudent: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private _astra: CassandraDatastaxService, private _shared: SharedDataService, private zone: NgZone) {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
      
  }

  login(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if(this.loginForm.valid) {
      this._astra.checkLoginCredentials(username, password).subscribe((res: any) => {
        this.router.navigate(['/home']);
        this._astra.getStudentDetails().subscribe(info => {
          info.filter(student => {
            if(username === student.stud_username) {
              console.log('from login',student.studid);
              this.idStudent = this._shared.setStudentUsername(student.stud_username);
            }
          });
          
        });

      }, (error) => {
        alert('Incorrect Credentials, Please try again')
      });
    }

    


  }

  signup(): void {
    this.router.navigate(['/signup']);
  }

}
