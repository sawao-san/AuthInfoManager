import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

//デコレーター：UserServiceクラスに追加の情報を与えるための存在
@Injectable({
  providedIn: 'root'  //このサービスがどこで利用できるかを示す。rootならアプリ全体
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users'
  constructor(private http:HttpClient) { 
    
  }
  getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiUrl)
    }
}
