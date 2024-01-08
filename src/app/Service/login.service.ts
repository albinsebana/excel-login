import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  private csvFile = 'assets/user.xlsx';
  addData: any[] = [];

  constructor(private http: HttpClient) {}

  getExcelData(): Observable<ArrayBuffer> {
    return this.http.get(this.csvFile, { responseType: 'arraybuffer' });
  }

  private studentEducationDataSubject = new BehaviorSubject<any[]>([]);
  educationData$ = this.studentEducationDataSubject.asObservable();
  

  
  getAddDetails(): any[] {
    return this.addData;
  }

  setAddData(data: any[]) {
    this.addData = data;
    this.studentEducationDataSubject.next(data);
    this.saveDataToExcel(data);
  }
  private saveDataToExcel(data: any[]) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
  
    // Save the workbook to a file
    const fileName = 'user.xlsx';
    XLSX.writeFile(workbook, fileName);
  }
  
  
}
