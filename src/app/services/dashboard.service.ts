import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  user_details(mem_id,token){
    return this.http.get('membertogroupmasterMid/MId?Mid='+mem_id+'&Token='+token);

  }
}
