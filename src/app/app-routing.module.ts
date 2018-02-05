import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesComponent } from './games/games.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: GamesComponent, children:[
    //{ path: ':id', component: GameDetailComponent, data: {test: this.games}}
  ]},
 { path: 'games/:id', component: GameDetailComponent, data: {test: this.games} }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}