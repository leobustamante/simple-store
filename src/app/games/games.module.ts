import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesService } from './games.service';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { LoaderComponent } from '../shared/loader/loader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GameDetailComponent
  ],
  providers: [
     GamesService
  ]
})
export class GamesModule { }
