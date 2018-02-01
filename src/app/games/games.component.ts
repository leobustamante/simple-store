import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { GamesService } from './games.service';

import { NameFilterPipe } from '../pipes/name-filter.pipe';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  enableFilter: boolean;
  filterText: string;
  filterPlaceholder: string;
  filterInput: string;
  games: Array<any>;
  params = { limit: 10, offset: 0};

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.getGames();
    this.filterText = "";
  }

  getGames(): void {
    this.gamesService.getCustomers()
        .subscribe(games => this.setGamesList(games));
  }

  setGamesList(games) {
    this.games = games.top;
    console.log(this.games)

    this.enableFilter = true;

    this.filterPlaceholder = "Buscar";
  }

}
