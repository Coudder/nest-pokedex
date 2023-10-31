import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";


//se póne el decorador para poderlo inyectar en el seedservice
@Injectable()
export class AxiosAdapter implements HttpAdapter{
    
    private axios: AxiosInstance = axios;

    
    async get<T>(url: string): Promise<T> {
        
        try {
            

            const { data } = await this.axios.get<T>(url)

            return data

        } catch (error) {
            console.log(error);
            throw new Error('Error en el servidor - Check Logs')
        }


    }



}