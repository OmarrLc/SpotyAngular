import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {faMusic, faPlay} from '@fortawesome/free-solid-svg-icons'
import { ArtistasService } from '../../services/artistas.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() onVerArtista = new EventEmitter();
  @Output() onVerPlaylist = new EventEmitter();
  faMusic=faMusic;
  faPlay=faPlay
  regionVisible: string;
  artistas:any=[];
  playlists:any=[];
  constructor(private artistaService:ArtistasService, private usuarioService:UsuariosService) { }

  ngOnInit(): void {
   this.artistaService.obtenerArtistas().subscribe(
     res=>{
       this.artistas=res;
       console.log(this.artistas);
     },
     error=>{
       console.log(error); 
     }
   );
  }

  verArtista(artista){
    this.onVerArtista.emit({idArtista:artista._id, nombreArtista:artista.nombreArtista});
  }
  
  verPlaylist(id){
    this.onVerPlaylist.emit(id);
  }

  obtenerPlaylists(usuario){
    this.playlists=[];
    console.log('Obtener las Playlist del usuario', usuario);
    this.usuarioService.obtenerPlaylists(usuario).subscribe(
      res=>{
        console.log('Playlist', res);
        this.playlists= res.playlists;
      },
      error=>{
        console.log(error);
      }
    )
  }

}
