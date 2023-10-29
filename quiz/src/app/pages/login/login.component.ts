import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logindata = {
    username:'',
    password:''
  };

  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.logindata.username.trim()=='' || this.logindata.username==null){
      this.snack.open('Username is required !! ', '',{
        duration:3000,
      });
      return ;
    }

    //request to server to generate token
    this.login.generateToken(this.logindata).subscribe(
      (data:any)=>{
        console.log("Success");
        console.log(data);

        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);

            //redirect admin dashboard
            //redirect user dashboard
            if(this.login.getUserRole()=='ADMIN'){
            //admin dashboard
            //window.location.href='/dashboard';
            this.router.navigate(['dashboard'])
            this.login.loginStatusSubject.next(true)
            }else if(this.login.getUserRole()=='NORMAL'){
            //normal user dashboard
            //window.location.href='/user-dashboard';
            this.router.navigate(['user-dashboard/0'])
            this.login.loginStatusSubject.next(true)

      }else{
        this.login.logout();
      }});
     


      },
      (error)=>{
        console.log("Error !");
        console.log(error);
        this.snack.open('Invalid details ! try again ! ', '',{
          duration:3000,
        });
      }
    );
 
  }

}
