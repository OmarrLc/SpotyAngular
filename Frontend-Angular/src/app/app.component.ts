import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { AlbumComponent } from './components/album/album.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidebar') sidebarComponent:SidebarComponent;
  @ViewChild('playlist') playlistComponent:PlaylistComponent;
  @ViewChild('album') albumComponent:AlbumComponent;
  
  title = 'Spotify';
  regionVisible='';

  verArtista(artista){
    this.regionVisible='artista'
    this.albumComponent.obtenerAlbumes(artista);
  }

  // verPlaylist(id){
  //   this.regionVisible='playlist'
  //   console.log('Ver artista con id', id);
  // }

  verPlaylist(playlist){ 
    this.regionVisible='playlist';
    this.playlistComponent.verPlaylist(playlist);
    console.log('Ver playlist con id', playlist);
  }

  selecionarUsuario(usuario){
    console.log('Usuario Seleccionado', usuario);
    this.sidebarComponent.obtenerPlaylists(usuario);
    this.albumComponent.idUsuarioActual=usuario ;
  }

  recargarPlaylist(idUsuario){
    this.sidebarComponent.obtenerPlaylists(idUsuario);
  }

}
