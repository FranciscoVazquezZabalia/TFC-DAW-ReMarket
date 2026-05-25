import { Component } from '@angular/core';

interface Producto {
  id_producto: number;
  title: string;
  price: number;
  img: string;
}

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user = {
    nombre: 'Francisco Vázquez',
    email: 'fran@ejemplo.com',
    fecha_registro: 'Mayo 2026',
    avatar: '?'
  };

  myProducts: Producto[] = [
    { id_producto: 1, title: 'iPhone 17 Pro', price: 950, img: 'https://www.apple.com/v/iphone-17-pro/d/images/overview/welcome/hero__bdntboqignj6_xlarge.jpg' }
  ];
}
