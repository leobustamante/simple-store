
export class ImagesModel {
  large: string;
  medium: string;
  small: string;
  template: string;

}

export class GameItemModel {
  constructor(
    public id: number,
    public name: string,
    public viewers: number,
    public channels: number,
    public popularity: string,
    public images: ImagesModel
    ) { }
}
