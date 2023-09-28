import { Observable } from "rxjs";
import { Tarefa } from "../model/tarefa.model";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { TODO_API } from "../app.api";
import { Injectable } from "@angular/core";

@Injectable()
export class TarefaService {
    

    constructor(private http: HttpClient) {}

    listarTarefas(): Observable<Tarefa[]>{
        /*
            const headers = new HttpHeaders({'Content-Type':'application/json', 
                                             'Access-Control-Allow-Origin':'*',
                                             'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                                             'Access-Control-Allow-Headers':'X-Requested-With,content-type',
                                             'Access-Control-Allow-Credentials':'true'});
  
            const requestOptions = { headers: headers };
        */
        return this.http.get<Tarefa[]>(`${TODO_API}/backtodo/rest/tarefa/listar/`)
    }
}