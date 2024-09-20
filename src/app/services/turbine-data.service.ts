// src/app/services/turbine-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurbineDataService {
  private climateUrl = 'http://10.0.0.106:3001/climate';
  private device1Url = 'http://10.0.0.106:3001/device1';
  private device2Url = 'http://10.0.0.106:3001/device2';

  constructor(private http: HttpClient) {} // Ensure HttpClient is injected

  getClimateData(): Observable<any> {
    return this.http.get<any>(this.climateUrl);
  }

  getDeviceData1(): Observable<any> {
    return this.http.get<any>(this.device1Url);
  }

  getDeviceData2(): Observable<any> {
    return this.http.get<any>(this.device2Url);
  }
}
