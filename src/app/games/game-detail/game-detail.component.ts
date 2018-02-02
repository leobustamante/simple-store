import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';

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

  @Input() games: GameDataModel;

  constructor(
    private route: ActivatedRoute,  
    private gamesService: GamesService,
    private location: Location
  ) {
    console.log(route.snapshot.data)
  }

  ngOnInit(): void {
    console.log(this.games)

    this.route.queryParams
      .filter(params => params.name)
      .subscribe(params => {
        console.log(params); // {order: "popular"}

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
    //this.gameDeta

    console.log(this.game)
  }

  goBack(): void {
    this.location.back();
  }

  goToGameDetails(event, item): void {
    event.preventDefault();

  }


}
