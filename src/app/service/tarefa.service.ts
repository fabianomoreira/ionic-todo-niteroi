import { Observable } from "rxjs";
import { Tarefa } from "../model/tarefa.model";
import { HttpClient } from "@angular/common/http"
import { TODO_API } from "../app.api";
import { Injectable } from "@angular/core";

@Injectable()
export class TarefaService {
    constructor(private http: HttpClient) {}

    listarTarefas(): Observable<Tarefa[]>{
        return this.http.get<Tarefa[]>(`${TODO_API}/backtodo/rest/tarefa/listar`)
    }
}