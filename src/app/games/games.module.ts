import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesService } from './games.service';
import { GameDetailComponent } from './game-detail/game-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GameDetailComponent],
  providers: [
     GamesService
  ]
})
export class GamesModule { }
