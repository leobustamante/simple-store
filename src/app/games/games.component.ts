import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
//import { InfiniteScroll } from 'ngx-infinite-scroll';

import { GameDataModel, TopGamesModel } from '../providers/game.model';
import { GamesService } from './games.service';

import { NameFilterPipe } from '../pipes/name-filter.pipe';

@Component({
  selector: 'app-games',
  //directives: [ InfiniteScroll ],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  enableFilter: boolean;
  filterText: string;
  filterPlaceholder: string;
  filterInput: string;
  games: Array<GameDataModel> = [];
  baseLimit = 20;
  baseOffset = 0;
  params = { limit: this.baseLimit, offset: this.baseOffset };

  constructor(private gamesService: GamesService) {
    this.enableFilter = true;
    this.filterPlaceholder = "Buscar";
  }

  ngOnInit() {
    this.getGames();
    this.filterText = '';
  }

  getGames(): void {
    console.log(this.params)
    this.gamesService.getGames(this.params)
        .subscribe(games => this.setGamesList(games));
  }

  setGamesList(games) {
    this.params.offset = this.params.offset + 1;
    let top = games.top;

    if(!this.games.length) {
      this.games = top;
    } else {
      top.map(item => this.games.push(item))
    }
  }

  onScroll() {
    console.log('scrolledd!!!')
    this.getGames();
  }

}
