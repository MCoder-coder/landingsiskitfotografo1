import { Fotos } from 'src/app/core/models/fotos.model';
export interface CartItem{

  ID : number,
  foto : Fotos,
  cantidad : number,
  size : string
  impresa : boolean

}
