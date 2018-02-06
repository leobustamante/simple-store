import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';

import { LoaderComponent } from '../../shared/loader/loader.component';

import { GameModel, GameDataModel } from '../../providers/game.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  game: Array<any>;
  name: string;
  buffering: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private location: Location
  ) {
    this.buffering = true;
  }

  ngOnInit(): void {

    this.router.routerState.parent(this.route).params.subscribe(params => {
        //this.parentRouteId = +params["id"];
        console.log(params)
      });

    this.route.queryParams
      .filter(params => params.name)
      .subscribe(params => {
        this.name = params.name;
        this.getGame();
      });
  }

  getGame(): void {
    this.gamesService.getGame(this.name)
      .subscribe(result => this.setGameDetails(result));
  }

  setGameDetails(result) {
    this.game = result.games[0];
    this.buffering = false;
  }

  goBack(): void {
    this.location.back();
  }

  goToGameDetails(event, item): void {
    event.preventDefault();

  }
}
