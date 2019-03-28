import {IImage} from './image';
import {ISongCategory} from './song-category';
import {IMp3File} from './mp3-file';

export interface ISong {
  id: number;
  name: string;
  description: string;
  singer_name: string;
  mp3File: IMp3File;
  image: IImage;
  songCategory: ISongCategory;
  listenCount: number;
}
