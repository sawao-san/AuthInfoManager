import { Component } from '@angular/core';
import { SearchForm } from '../../components/search-form/search-form';
import { SearchResult } from '../../components/search-result/search-result';

@Component({
  selector: 'app-search-user',
  imports: [SearchForm, SearchResult],
  templateUrl: './search-user.html',
  styleUrl: './search-user.scss'
})
export class SearchUser {

}
