import { Component,
  OnInit,
  Renderer2,
  HostListener,
  ElementRef,
  signal,
  ViewEncapsulation } from '@angular/core';
import { RouteLogin } from '../../../models/login.model';
import { RouteNav } from '../../../models/nav.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Category } from '../../../models/category.model';
import { LabelValue } from '../../../models/label-value.model';
import { TokenService } from '../../../services/token.service';
import { RouteLayout } from '../../../models/nav-admin.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavBarComponent implements OnInit {
  isLoading = signal(false);

  categories: Category[] | undefined;
  labelValue: LabelValue[] | undefined;
  selectedCategory: String | undefined;

  userId: {nombre: string; apellido: string; is_staff: boolean};

  showCart: boolean = false;

  openCart() {
    this.showCart = true;
  }

  ngOnInit(): void {
    this.authService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.labelValue = categories.map((category) => ({
        label: category.nombre,
        value: category.id_categoria,
      }));
    });

    this.userId = this.tokenService.getUserIdFromToken();
    console.log(this.userId)
  }

  logout() {
    this.tokenService.deleteToken();
  }

  routesnav: RouteNav[] = [
    {
      name: 'Inicio',
      routerLink: '/pages/home-page',
    },
    {
      name: 'Sedes',
      routerLink: '/pages/sedes',
    },
  ];

  routes: RouteLogin[] = [
    {
      name: 'Iniciar sesión',
      routerLink: '/auth/login',
    },
  ];

  routes1: RouteLayout[] = [
    {
      name: "Cepillados",
      icon: "pi pi-objects-column",
      routerLink: "/sno-cream",
    },
    {
      name: "Postres",
      icon: "pi pi-objects-column",
      routerLink: "/sno-desserts",
    },
    {
      name: "Bebidas",
      icon: "pi pi-objects-column",
      routerLink: "/sno-drinks",
    },
    {
      name: "Sedes",
      icon: "pi pi-map-marker",
      routerLink: "/sedes",
    },
    {
      name: "Iniciar sesión",
      icon: "pi pi-sign-in",
      routerLink: "/login",
    },
  ]

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken(); // Suponiendo que tokenService es cómo accedes al token de autenticación
  }

  logOut() {
    this.authService.logOut();
  }

  onCategoryChange(category: { label: string; value: number }) {
    switch (category.label) {
      case 'Cepillados':
        this.router.navigate(['/sno-cream']);
        break;
      case 'Postres':
        this.router.navigate(['/sno-desserts']);
        break
      case 'Bebidas':
        this.router.navigate(['/sno-drinks']);
        break;
      default:
        this.router.navigate(['pages/home-page']);
    }
  }
  openSidebar(nav: HTMLElement) {
    this.rederer2.addClass(nav, 'open');
  }

  closeSidebar(nav: HTMLElement) {
    this.rederer2.removeClass(nav, 'open');
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset > 20) {
      this.el.nativeElement.querySelector('.sticky-nav').classList.add('scrolled');
    } else {
      this.el.nativeElement.querySelector('.sticky-nav').classList.remove('scrolled');
    }
  }

  constructor(
    public tokenService: TokenService,
    private el: ElementRef,
    private rederer2: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {}
}
