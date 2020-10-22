import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../services/usuarios.service';

@Component({  
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private modalService:NgbModal, private usuariosService:UsuariosService) { }
  @Output() onSeleccionarUsuario= new EventEmitter();
  @Output() onRecargarPlaylist = new EventEmitter();

  nombrePlaylist:string='';
  usuarios:any=[];
  usuarioSeleccionado:any;
  ngOnInit(): void {
    this.usuariosService.obtenerUsarios().subscribe(
      res=>{
        this.usuarios=res;
        console.log(this.usuarios);
      },
      error=>{
        console.log(error);
      }
    )
  }


  guardarPlaylists(){
    this.usuariosService.guardarPlaylist(
      this.usuarioSeleccionado,
      this.nombrePlaylist
    ).subscribe(
      res=>{
        console.log(res);
        if(res.ok==1){
          this.modalService.dismissAll();
          this.onRecargarPlaylist.emit(this.usuarioSeleccionado)
        }
        this.modalService.dismissAll();
      },
      error=>{
        console.log(error);
      }
    )

  }
  abrirNuevaPlaylists(modal){
    this.modalService.open(modal,
      {
        size:'xs',
        centered:false});
  }
  seleccionarUsuario(){
    console.log(this.usuarioSeleccionado);
    this.onSeleccionarUsuario.emit(this.usuarioSeleccionado);
    this.modalService.dismissAll()
  }

  abrirModalUsuario(modal){
    this.modalService.open(modal,
      {
        size:'xs',
        centered:false});
  }

}
