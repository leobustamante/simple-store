import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { LoaderComponent } from '../shared/loader/loader.component';

import { GameDataModel, TopGamesModel } from '../providers/game.model';
import { GamesService } from './games.service';

import { NameFilterPipe } from '../pipes/name-filter.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';

@Component({
  selector: 'app-games',
  //directives: [ InfiniteScroll ],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  public radioGroupForm: FormGroup;
  buffering: boolean;
  enableFilter: boolean;
  filterText: string;
  filterPlaceholder: string;
  filterInput: string;
  public games: Array<GameDataModel> = [];
  baseLimit = 20;
  baseOffset = 0;
  params = { limit: this.baseLimit, offset: this.baseOffset };
  order = -1;//asc

  constructor(
    private gamesService: GamesService,
    private formBuilder: FormBuilder
  ) {
    this.buffering = true;
    this.enableFilter = true;
    this.filterPlaceholder = "Buscar";

  }

  ngOnInit() {
    this.getGames();
    this.filterText = '';
    this.radioGroupForm = this.formBuilder.group({
      'filterModel': 'game.popularity'
    });
  }

  getGames(): void {
    this.gamesService.getGames(this.params)
        .subscribe(games => this.setGamesList(games));
  }

  setGamesList(games) {
    this.params.offset = this.params.offset + this.baseLimit;
    let top = games.top;

    if(!this.games.length) {
      this.games = top;
    } else {
      top.map(item => this.games.push(item));
    }
    console.log(this.games)
    this.buffering = false;
  }

  onScroll() {
    this.buffering = true;
    this.getGames();
  }

}
