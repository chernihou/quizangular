import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();


  constructor(private http: HttpClient) {}

  //current user which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

    //generate token
    public generateToken(logindata:any){
      return this.http.post(`${baseUrl}/generate-token`, logindata);
    }

    //login user: set token in localStorage
    public loginUser(token:any){
      localStorage.setItem('token',token);
      return true;
    }

    //isLogin: user is logged in or out
    public isLoggedIn(){
      let tokkenStr=localStorage.getItem("token")
      if(tokkenStr==undefined||tokkenStr==''||tokkenStr==null){
        return false;
      }else{
        return true;
      }
    }

    //logout: remove token from localStorage
    public logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;

    }

    //get token
    public getToken(){
      return localStorage.getItem("token");
    }

    //set userDetails
    public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
    }

    //getUser
    public getUser(){
      let userStr=localStorage.getItem('user');
      if(userStr!=null){
        return JSON.parse(userStr);
      }else{
        this.logout();
        return null;
      }
    }

    //get userRole
    public getUserRole(){
      let user=this.getUser();
      return user.authorities[0].authority;
    }
   
  }
