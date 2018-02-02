
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
  box: ImagesModel;
  logo: ImagesModel;
}

export class TopGamesModel {
  channels: number;
  viewers: number;
  game: GameModel;

}

export class GameDataModel {
  _total: number;
  _links: object;
  top: Array<TopGamesModel>;
}
