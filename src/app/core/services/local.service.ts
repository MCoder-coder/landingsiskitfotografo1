import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
@Injectable({
providedIn: "root"
})
// no hay necesidad de secuenciar / analizar sus objetos antes y después de almacenarlos.
//gracias a la libraria SecureStorage
export class LocalService {
  //inyecto el servicio de Storage service para poder acceder a sus metodos hash,encrypt, descript
constructor(private storageService: StorageService) { }
// Set the json data to local storage
setJsonValue(key: string, value: any) {
  //almaceno el local storage con clave valor
    this.storageService.secureStorage.setItem(key, value);
}

getJsonValue(key: string) {
    //obtengo los datos del key guardado
  return this.storageService.secureStorage.getItem(key);
}

clearToken() {
   // limpio los datos
    return this.storageService.secureStorage.clear();
}
}
