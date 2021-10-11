import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { info } from 'console';
import * as ytdl from 'ytdl-core';
import * as iso8601 from 'iso8601-duration';
import { infos, music } from '../model/music';
import { environment } from '../../environments/environment';
import {observable, Observable} from 'rxjs';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class MusicDownloadService {
  musicInfo: infos[] = [];

  apiKey = environment.apikey;
  baseApi = environment.baseUrl;


  constructor(private http: HttpClient) { }

  fetchMusicInfo(): void {
    this.http.get(this.baseApi + this.apiKey)
      .subscribe((response: any) => {
        // console.log(response);
        response.items.map((item: music) => {
          this.musicInfo.push(
            {
              videoId: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              duration: null,
              fileSize: null
            }
          );
        });
        this.fetchDuration();
        // console.log(this.musicInfo);
      });
  }

  fetchDuration(): void {
    let ids = '';
    this.musicInfo.forEach((music) => {
      ids += music.videoId + ',';
    });
    ids = ids.slice(0, -1);
    const url = 'https://www.googleapis.com/youtube/v3/videos?id=' + ids + '&part=contentDetails&key=' +  environment.apikey;
    console.log('url', url);
    this.http.get(url).subscribe((res: any) => {
      res.items.map((item, index) => {
        this.musicInfo[index].duration = this.convertDuration(item.contentDetails.duration);
        this.musicInfo[index].fileSize = 24 * 44; 100 * this.musicInfo[index].duration * 2;
      });
    });
  }

  convertDuration(duration: string): any {
    const calc = iso8601.parse(duration);
    return calc.minutes * 60 + calc.seconds;
  }

  downloadMusic(music: infos): Observable<any>{
    return new Observable<any>(obs => {
      const from_stream = ytdl('http://www.youtube.com/watch?v=' + music.videoId).on('error', (err) => {console.log(err); });
      const to_stream = fs.createWriteStream('./' + music.title + '.mp3');
      let written = 0;
      from_stream.on('data', data => {
        // do the piping manually here.
        to_stream.write(data, () => {
          written += data.length;
          obs.next((written / music.fileSize * 100).toFixed(2));
          console.log(`written ${written} of ${music.fileSize} bytes (${(written / music.fileSize * 100).toFixed(2)}%)`);
        });
      });
    });
  }
}
