import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {
  products = [
    { title: 'iPhone 17 Pro', price: 950, category: 'Tecnología', state: 'Como nuevo', img: 'https://www.apple.com/v/iphone-17-pro/d/images/overview/welcome/hero__bdntboqignj6_xlarge.jpg '},
    { title: 'MacBook Air M2', price: 1100, category: 'Tecnología', state: 'Excelente', img: 'https://www.apple.com/newsroom/images/product/mac/standard/Apple-WWDC22-MacBook-Air-hero-220606_big.jpg.large.jpg' },
    { title: 'Sudadera Vintage', price: 30, category: 'Moda', state: 'Buen estado', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn_RwUVxSoaU62KPfZEBftbQDuY1hWFeRbcQ&s' }
  ];
}
