import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
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
      if(username === 'Peter' && password === 'password123') {
        this.router.navigate(['/home']);
      }else {
        alert("Invalid Credentials");
      }
    }
  }

  signup(): void {
    this.router.navigate(['/signup']);
  }

}
