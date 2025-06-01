import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { SearchUser } from './pages/search-user/search-user';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, SearchUser],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'AuthInfo';
}
