import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesService } from './games.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ 
     GamesService
  ]
})
export class GamesModule { }