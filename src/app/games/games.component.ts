import { Component, OnInit, HostListener } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { LoaderComponent } from '../shared/loader/loader.component';

import { GameItemModel } from '../providers/game.model';
import { GamesService } from './games.service';

import { NameFilterPipe } from '../pipes/name-filter.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  public radioGroupForm: FormGroup;
  games: Array<GameItemModel> = [];
  buffering: boolean;
  filterText: string;
  filterPlaceholder: string;
  filterInput: string;
  baseLimit = 20;
  baseOffset = 0;
  order = -1; // asc
  myStorage = window.localStorage;

  constructor(
    private gamesService: GamesService,
    private formBuilder: FormBuilder
  ) {
    this.buffering = true;
    this.filterPlaceholder = 'Buscar';
    this.setFetchLimit(window.screen.width);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setFetchLimit(event.target.innerWidth);
  }

  ngOnInit() {
    this.filterText = '';
    this.radioGroupForm = this.formBuilder.group({
      'filterModel': 'popularity'
    });
    this.getGames();
  }

  getGames(): void {
    this.gamesService.getGames(this.getParams())
        .subscribe(games => this.setGamesList(games));
  }

  setGamesList(games) {
    this.baseOffset += this.baseLimit;
    if (!this.games.length) {
      this.games = games;
    } else {
      games.map(item => this.games.push(item));

    }
    window.localStorage.setItem('games', JSON.stringify(this.games));
    this.buffering = false;
  }

  getParams(): any {
    return { limit: this.baseLimit, offset: this.baseOffset };
  }

  onScroll() {
    this.buffering = true;
    this.getGames();
  }

  setFetchLimit(SW: number) {
    const mob = 425, tab = 768;
    this.baseLimit = SW <= mob ? 25 : SW <= tab ? 50 : 100;
  }
}
