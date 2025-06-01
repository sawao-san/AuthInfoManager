import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-search-result',
  imports: [],
  templateUrl: './search-result.html',
  styleUrl: './search-result.scss'
})
export class SearchResult implements OnInit{ //implementsはOnInitが使われているかを確認する
  users : User[] = [];

  constructor(private userService : UserService){
    

  } //サービスを依存注入

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(): void {
    this.userService.getUsers()
    .subscribe({
      next:(data) => {
        this.users = data; //データ取得時に配列に格納
        console.log('取得データ:', this.users); //デバッグ用にコンソールに出力 
      },
      error: (error) => {
        console.log('データの取得に失敗しました:', error) //エラー処理
      
      }
    });
  }
}
