import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Producto {
  id_producto: number; 
  title: string;
  price: number;
  category: string;
  state: string;
  img: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {

  // Imágenes del carrusel
  featuredImages = [
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
  ];

  // Datos de prueba 
  products : Producto[] = [
    { id_producto: 1, title: 'iPhone 17 Pro', price: 950, category: 'Tecnología', state: 'Como nuevo', img: 'https://www.apple.com/v/iphone-17-pro/d/images/overview/welcome/hero__bdntboqignj6_xlarge.jpg '},
    { id_producto: 2, title: 'MacBook Air M2', price: 1100, category: 'Tecnología', state: 'Excelente', img: 'https://www.apple.com/newsroom/images/product/mac/standard/Apple-WWDC22-MacBook-Air-hero-220606_big.jpg.large.jpg' },
    { id_producto: 3, title: 'Sudadera Vintage', price: 30, category: 'Moda', state: 'Buen estado', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn_RwUVxSoaU62KPfZEBftbQDuY1hWFeRbcQ&s' }
  ];
}