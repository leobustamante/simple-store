import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';

import { LoaderComponent } from '../../shared/loader/loader.component';

import { GameItemModel } from '../../providers/game.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  gameId: string;
  game: GameItemModel;
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
    this.route.params
      .subscribe( params => {
        this.gameId = params.id;
        this.getGame(this.gameId);
      });
  }

  getGame(gameId): void {
    this.gamesService.getGame(gameId)
      .subscribe(result => this.setGameDetails(result));
  }

  setGameDetails(result) {
    this.game = result;
    this.buffering = false;
  }

  goBack(): void {
    //this.location.back();
    this.router.navigate(['/games']);

  }
}
