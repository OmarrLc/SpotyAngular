import { Component, OnInit } from '@angular/core';
import {faMusic, faPlay} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  faMusic=faMusic;
  faPlay=faPlay
  playlist:any=[];
  constructor() { }

  ngOnInit(): void {
  }
  verPlaylist(playlist){
    console.log('Ver desde PlaylistComponent', playlist);
    this.playlist= playlist;
  }

}
