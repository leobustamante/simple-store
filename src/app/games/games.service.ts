import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GamesService {
  private apiUrl = 'https://api.twitch.tv/kraken/games/top';  // URL to web api

  private params = {limit: 10, offset: 0};

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Client-ID': 'ipmqjlawigtbo0b9h2ilqw33sx8h5w'
  });

  constructor(private http: Http) { }

  getCustomers(): Observable<any> {
    return this.http.get( this.apiUrl, { headers: this.headers, params: this.params })
      .map(this.extractJson)
      .catch((error: Response | any) => this.handleError(error));
  }

  private extractJson(res: Response) {
    console.log(res.json())
    return res.json();
  }

  private handleError(error: Response | any) {
    return this.throwError(this.showError(this.extractError(error)));
  }

  private extractError(error: Response | any) {
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      return `${error.status} - ${error.statusText || ''} ${err}`;
    }
    return error.message ? error.message : error.toString();
  }

  private showError(error: string) {
    /*this.translate.get('bundle.action.close').subscribe((bundle: string) => {
      this.snackBar.open(error, bundle, {
        duration: 20000,
        extraClasses: ['snack-error']
      });
    });*/
    return error;
  }

  private throwError(error: string) {
    return Observable.throw(error);
  }

}
