import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private api = environment.api;
  token!: string;
  userId!: string;
  isAuth$ = new BehaviorSubject<boolean>(false);
  signupData: any;

  constructor(private http: HttpClient) { }

  signup(email: string ,password: string){
    return new Promise((resolve, reject)=>{
      this.http.post(this.api+'/users/signup',{email:email, password:password}).subscribe(
        (sugnupData: {status: number, message: string}) => {
          if(this.signupData.status === 201){
            //athentifier l'utilisateur
            this.login(email,password)
            
          
          })
          
      },
        (err)=>{
          reject(err)
        }
      )
    })
  

  login(email: string, password: string){
    return new Promise ((resolve, reject)=>{
      this.http.post(this.api+'/users/login,',{email:email, password:password}).subscribe(
        (authData: { token: string, userId: string })=>{
         this.token = authData.token;
         this.userId = authData.userId;
         this.isAuth$.next(true);
         resolve(true);
        },
        (err)=>{
          reject(err)
        }
      )
    })
  }

  logout(){

  }
}