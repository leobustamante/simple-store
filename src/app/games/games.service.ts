import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { GameItemModel } from '../providers/game.model';

@Injectable()
export class GamesService {
  private apiTopUrl = 'https://api.twitch.tv/kraken/games/top';  // URL to web api
  private apiGameUrl = 'https://api.twitch.tv/kraken/search/games';  // URL to web api

  params: any;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Client-ID': 'ipmqjlawigtbo0b9h2ilqw33sx8h5w'
  });

  constructor(protected httpClient: HttpClient) { }

  getGames(opt: any): Observable<GameItemModel> {

    const httpOptions = {
      params: opt.length ? new HttpParams().set('limit', opt.limit).set('offset', opt.offset ) : {},
      headers: this.headers
    };

    return this.httpClient.get<any>(this.apiTopUrl, httpOptions)
    .pipe(
      map((res: any) => {
        return res.top.map(item => {
          return new GameItemModel(
            item.game._id,
            item.game.name,
            item.viewers,
            item.channels,
            item.game.popularity,
            item.game.box
          );
        });
      }),
      catchError(this.handleError)
    );
  }

  getGame(id: number | string): Observable<GameItemModel[]> {
    return of(JSON.parse(window.localStorage.getItem('games'))
      .find(x => x.id === +id));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }
}
