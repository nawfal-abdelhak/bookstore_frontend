import { Injectable, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { HelpersService } from './helpers.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  oldLat: any;
  oldLng: any;

  constructor(
    private geolocation: Geolocation,
    private helper: HelpersService,
    private api: ApiService,
  
  ) { }

  
  }

