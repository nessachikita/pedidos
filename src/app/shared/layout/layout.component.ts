import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouteLayout } from '../../models/nav-admin.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  routes: RouteLayout[] = [
    {
      name: "Productos",
      icon: "pi pi-objects-column",
      routerLink: "/products",
    },
    {
      name: "Usuarios",
      icon: "pi pi-users icon",
      routerLink: "/users",
    },
    {
      name: "Pedidos",
      icon: "pi pi-receipt icon",
      routerLink: "/pedidos",
    },
    {
      name: "Generar reportes",
      icon: "pi pi-file-export",
      routerLink: "/reportes",
    },
    {
      name: "Opciones",
      icon: "pi pi-cog icon",
      routerLink: "/settings",
    },
  ]

  openSidebar(nav: HTMLElement) {
    this.rederer2.addClass(nav, 'open');
  }

  closeSidebar(nav: HTMLElement) {
    this.rederer2.removeClass(nav, 'open');
  }

  logOut() {
    this.authService.logOut();
  }

  constructor(private rederer2: Renderer2, private authService: AuthService) {}
}
