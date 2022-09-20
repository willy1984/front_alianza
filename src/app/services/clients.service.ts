import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Constants } from '../constants';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/responseDto';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  getClients(): Observable<ResponseDto> {
    return this.http.get<any>(`${this.url}${Constants.GET_CLIENTS}`)
  }

  createClient(client: any): Observable<ResponseDto> {
    return this.http.post<any>(`${this.url}${Constants.CREATE_CLIENT}`, client)
  }

  getBySharedKey(sharedKey: string): Observable<ResponseDto> {
    return this.http.get<any>(`${this.url}${Constants.GET_BY_SHARED_KEY}${sharedKey}`);
  }
}
