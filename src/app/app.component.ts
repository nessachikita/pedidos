import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { loaderAnimation } from './utils/page-animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [loaderAnimation]
})
export class AppComponent implements OnInit {
  navigation$: Observable<any>;
  showLoader = signal(false);
  
  title = 'sno';

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;

      this.navigation$ = this.router.events.pipe(
        tap((event) =>{
          if (event instanceof NavigationStart) {
            this.showLoader.set(true);
          } else if (event instanceof NavigationEnd) {
            this.showLoader.set(false);
          }
        })
      );
  }
}
