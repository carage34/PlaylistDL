import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { info } from 'console';
import * as ytdl from 'ytdl-core';
import { infos, music } from '../model/music';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MusicDownloadService {
  musicInfo: infos[] = [];

  apiKey = environment.apikey;
  baseApi = environment.baseUrl;


  constructor(private http: HttpClient) { }

  fetchMusicInfo() {
    this.http.get(this.baseApi + this.apiKey)
      .subscribe((response: any) => {
        response.items.map((item: music) => {
          this.musicInfo.push(
            {
              videoId: item.snippet.resourceId.videoId,
              title: item.snippet.title
            }
          );
        })
        console.log(this.musicInfo);
      });
  }
}
