import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient:HttpClient) { }

  obtenerUsarios():Observable<any>{
    return this.httpClient.get('http://localhost:8888/usuarios',{});

  }
  obtenerPlaylists(usuario):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/usuarios/${usuario}/playlists`,{});

  }

  guardarCancionEnPlaylist(data:any):Observable<any>{
    return this.httpClient.post(`http://localhost:8888/usuarios/${data.idUsuario}/playlists/${data.idPlaylist}/canciones`,
    {
      nombreCancion: data.cancion.nombreCancion,
      artista: data.nombreArtista,
      album: data.nombreAlbum
    });

  }

  guardarPlaylist(idUsuario,nombrePlaylist):Observable<any>{
    return this.httpClient.post(`http://localhost:8888/usuarios/${idUsuario}/playlists`,
    {
      tituloPlaylist: nombrePlaylist
    });
  }
  
  
}