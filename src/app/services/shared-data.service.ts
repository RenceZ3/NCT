import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  studentUsername: string | undefined;

  constructor(private zone: NgZone) { }

  setStudentUsername(id: string): void {
    this.zone.run(() => {
      this.studentUsername = id;
    })
    
  }

  getStudentUsername(): string | undefined {
    return this.studentUsername;
  }
}
