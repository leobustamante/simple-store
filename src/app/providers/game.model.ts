
export class ImagesModel {
  large: string;
  medium: string;
  small: string;
  template: string;

}

export class GameModel {
  _id: number;
  giantbomb_id: number;
  name: string;
  popularity: number;
  box: Images;
  logo: Images;
}

export class TopGamesModel {
  channels: number;
  viewers: number;
  game: Game;

}

export class GameDataModel {
  _total: number;
  _links: object;
  top: Array<TopGames>;
}
