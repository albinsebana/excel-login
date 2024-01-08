import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

import { Router } from '@angular/router';

import { LoginService } from '../Service/login.service';

// import { json } from 'stream/consumers';

interface User {
  id: string;
  username: string;
  password: string;
  
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: User[] = [];
  loginCreds = { username: '', password: '' };

  constructor(
    private router: Router,
    private lg: LoginService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.lg.getExcelData().subscribe((data: ArrayBuffer) => {
      const binaryData = new Uint8Array(data);
      const workbook = XLSX.read(binaryData, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Specify header information for the sheet
      const header = ['id', 'username', 'password'];


      this.userData = XLSX.utils.sheet_to_json(sheet, { header });
      // console.log(this.userData)
    });
  }

  onSubmit() {
    const username = this.loginCreds?.username || '';
    const password = this.loginCreds?.password || '';

    const validUser = this.userData.find(
      (user: User) =>
        user.username?.trim() === username.trim() &&
        user.password?.trim() === password.trim()
    );

    if (validUser) {
      this.router.navigate(['/data']);
    } else {
      alert('Invalid username or password.');
    }
  }
  
}
