import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {faMusic, faPlay, faPlus} from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArtistasService } from '../../services/artistas.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  @Output() onAgregarCancion = new EventEmitter();
  faMusic=faMusic;
  faPlay=faPlay;
  faPlus=faPlus;
  albumes:any=[];
  artistaActual:string;
  idUsuarioActual: string;
  playlists:any=[];
  playlistSeleccionado:any;
  cancionActual:any; 
  albumActual:string;
  constructor(private modalService:NgbModal, 
    private artistaSerice:ArtistasService,
    private sanitizer:DomSanitizer,
    private usuarioService:UsuariosService) { }
  ngOnInit(): void {

  }
  agregarAPlaylist(modal,cancion,album){
    this.cancionActual=cancion;
    this.albumActual=album;
    // console.log('Usuario actual', this.idUsuarioActual);
    this.usuarioService.obtenerPlaylists(this.idUsuarioActual).subscribe(
      res=>{
        this.playlists=res.playlists;
        // console.log('Playlist ',this.playlists); 
        this.modalService.open(modal, 
          {
            size:'xs',
            centered:false
          })
      },
      error=>{
        console.log(error);
      }
    );

    console.log('Agregar cancion a playlist: ',cancion); 
   
  }
  obtenerAlbumes(artista){
    this.artistaActual=artista.nombreArtista;
    console.log('Obtener albumes desde el componente album',artista);
    this.artistaSerice.obtenerAlbumes(artista.idArtista).subscribe(
      res=>{
        this.albumes=res.albumes;
      },error=>{
        console.log(error);
      }
    )
  }
  obtenerURL(imagen){
    return this.sanitizer.bypassSecurityTrustStyle(`url(../assets/${imagen})`)
  }

  guardarCancion(){
    const data={
      idUsuario: this.idUsuarioActual,
      idPlaylist: this.playlistSeleccionado,
      nombreArtista: this.artistaActual,
      cancion:this.cancionActual,
      nombreAlbum: this.albumActual
    }
    console.log('Informacion necesaria para guardar cancion en playlists', data);
    this.usuarioService.guardarCancionEnPlaylist(data).subscribe(
      res=>{
        console.log(res);
        if(res.ok==1){
          this.modalService.dismissAll();
          this.onAgregarCancion.emit(this.idUsuarioActual);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
}
