import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  public user={
  
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:''
  };

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
if(this.user.username =='' || this.user.username == null){
  //alert('User is required !!')
  this.snack.open('Username is required !!' ,'',{
    duration:2000,
    verticalPosition:'top',
  });
  return;
  
}
  //adduser userService
  this.userService.addUser(this.user).subscribe(
    (data) => {
      //success
      console.log(data);
     // alert("Success");
     Swal.fire('Success','User is registered succefully','success');
    },
    (error) => {
      //error
      console.log(error);
      //alert("Error");
      this.snack.open('Error' ,'',{
        duration:2000,
        verticalPosition:'top',
      });
    },


    
  )
}

}
