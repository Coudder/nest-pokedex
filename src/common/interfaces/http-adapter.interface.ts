//definicion de lo que necesitamos de una clase adaptadora

 export interface HttpAdapter {

    get<T>(url: string): Promise<T>

 }

 /**
  * DEFINICION DE UNA CLASE ADAPTADORA 
  *  va a tener que realizar la peticion get reciube el url y es una promesa de tipo generico
  */