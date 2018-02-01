import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { GameDataModel, TopGamesModel } from '../providers/game.model';
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

  constructor(private gamesService: GamesService) { 
    this.enableFilter = true;
    this.filterPlaceholder = "Buscar";
  }

  ngOnInit() {
    this.getGames();
    this.filterText = "";
  }

  getGames(): void {
    this.gamesService.getGames()
        .subscribe(games => this.setGamesList(games));
  }

  getGame(): void {

  }

  setGamesList(games) {
    this.games = games.top;   
  }

}
