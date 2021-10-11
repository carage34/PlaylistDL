import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { music } from './model/music';
import { MusicDownloadService } from './services/music-download.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'playlistdl';

  constructor(musicDownloadService: MusicDownloadService) {
    musicDownloadService.fetchMusicInfo();
    musicDownloadService.musicInfo.forEach(el => {
      musicDownloadService.downloadMusic(el).subscribe((data) => {
        console.log(data);
      });
    });
  }
}
