import { Foto } from './foto.model';

export interface CartItem{

  ID : number,
  foto : Foto,
  cantidad : number,
  size : string
  impresa : boolean

}
