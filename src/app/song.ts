import {IImage} from './image';
import {ISongCategory} from './song-category';

export interface ISong {
  id: number;
  name: string;
  description: string;
  singer_name: string;
  mp3_link: string;
  image: IImage;
  songCategory: ISongCategory;
}
