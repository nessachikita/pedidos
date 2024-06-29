import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  userId: {nombre: string; apellido: string; is_staff: boolean};

  ngOnInit(): void {
    this.userId = this.tokenService.getUserIdFromToken();
  }

  constructor(public tokenService: TokenService) {}
}
