import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GameModel } from '../../providers/game.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  game: Array<any>;
  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getGame();
  }

  getGame(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.gamesService.getGame(id)
      .subscribe(game => this.setGameDetails(game));
  }

  setGameDetails(game) {
    this.game = game;
    //this.gameDeta

    console.log(game)
  }

  goBack(): void {
    this.location.back();
  }


}
