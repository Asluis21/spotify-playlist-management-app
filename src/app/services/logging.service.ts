import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  logError(message: string, error: any): void {
    console.error(message, error);
    // Optionally send logs to a server
  }
}
