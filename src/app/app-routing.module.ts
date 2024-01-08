import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './Components/data/data.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path :'data',component:DataComponent},
  {path:'',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
