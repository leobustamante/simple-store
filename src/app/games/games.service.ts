import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';


import { GameItemModel } from '../providers/game.model';

@Injectable()
export class GamesService {
  private apiTopUrl = 'https://api.twitch.tv/kraken/games/top';  // URL to web api
  private apiGameUrl = 'https://api.twitch.tv/kraken/search/games';  // URL to web api

  params: any;

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Client-ID': 'ipmqjlawigtbo0b9h2ilqw33sx8h5w'
  });

  constructor(private http: Http) { }

  getGames(params: any): Observable<any> {
    this.params = params || {};
    return this.http.get(this.apiTopUrl, { headers: this.headers , params: this.params})
      .map(res => {
        return res.json().top.map(item => {
          return new GameItemModel(
            item.game._id,
            item.game.name,
            item.viewers,
            item.channels,
            item.game.popularity,
            item.game.box
          );
        });
      })
      .catch((error: Response | any) => this.handleError(error));
  }

  getGame(id: number | string): Observable<GameItemModel[]> {
    return of(JSON.parse(window.localStorage.getItem('games'))
      .find(x => x.id == +id));
  }

  private extractJson(res: Response) {
    return res.json();
  }

  private handleError(error: Response | any) {
    return this.throwError(this.extractError(error));
  }

  private extractError(error: Response | any) {
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      return `${error.status} - ${error.statusText || ''} ${err}`;
    }
    return error.message ? error.message : error.toString();
  }

  private throwError(error: string) {
    return Observable.throw(error);
  }

}
