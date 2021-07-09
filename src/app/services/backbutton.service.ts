import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackbuttonService {
  private blackLists: string[] = ['/cashprint'];

  constructor(private router: Router) {
  	    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        const blackList = this.blackLists.find(el => ev.url.includes(el));
        if (blackList) {
          this.disableBack();
        } else {
          this.enableBack();
        }
      }
    });
   }
     private logger() {
    console.log('disable back button');
  }

  disableBack() {
    document.addEventListener('backbutton', this.logger, false);
  }

  enableBack() {
    document.removeEventListener('backbutton', this.logger, false);
  }
}
