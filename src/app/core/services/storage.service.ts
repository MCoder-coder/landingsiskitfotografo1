import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
const SecureStorage = require('secure-web-storage');
const SECRET_KEY = 'cart';///key de carruti
@Injectable({
  providedIn: 'root',
})
//crypto libreria para encriptar local storage
export class StorageService {
  constructor() {}
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
      //encripto con el algoritmo sha256
      key = CryptoJS.SHA256(key, SECRET_KEY);
      //retorno la key la transformo en string
      return key.toString();
    },
    encrypt: function encrypt(data) {
      //encrypto el data y la key en este caso el data es el contenido del cart
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      //una vez encriptado los transformo a toString
      data = data.toString();
      //y dsp restorno el data
      return data;
    },
    decrypt: function decrypt(data) {
      //para obtener el dato tengo que descriptarlo incluyendo el data y el key
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      //la desincriptacion de data a toString y codificado a UTF8
      data = data.toString(CryptoJS.enc.Utf8);
      //y retornos los datos
      return data;
    },
  });
}
