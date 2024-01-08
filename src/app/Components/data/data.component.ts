import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  addForm!: FormGroup;
  addData: any[] = [];
  isUpdateMode: boolean = false;
  calculateSumClicked=false;
  updateIndex: number = -1;
  xlData:any;



  constructor(

    private fb: FormBuilder,
    private lg : LoginService
 
  
  ) {}


  ngOnInit(): void {
    this.addData = this.lg.getAddDetails();
    this.onAddForm();

   
  }

  onAddForm() {
    this.addForm = this.fb.group({
      num1: ['', ],
      num2: ['', ],
    });
  }
  calculateSum() {
    const num1 = this.addForm.value.num1 || 0;
    const num2 = this.addForm.value.num2 || 0;
    const sum = num1 + num2;

    // Save sum using LoginService
    this.addData.push({ sum });
    this.lg.setAddData(this.addData);
  }
  getSum(): number {
    return this.addData.reduce((total, item) => total + (item.sum || 0), 0);
  }
ReadExecl(event:any){
    let file = event.target.files[0];
    let fileReader: FileReader = new FileReader();

    fileReader.readAsBinaryString(file);
    
fileReader.onload=(e)=>{
  const workbook = XLSX.read(fileReader.result,{type: 'binary'});
  const SheetNames = workbook.SheetNames;
  
 console.log("sheet name"+SheetNames)
 this.xlData= XLSX.utils.sheet_to_json(workbook.Sheets[SheetNames[0]])

 console.log(this.xlData)
}
  }

}
