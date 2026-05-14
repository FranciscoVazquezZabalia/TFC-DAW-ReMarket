import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {

  product = {
    title: 'iPhone 15 Pro',
    price: 950,
    description: 'Estado impecable, siempre con funda y protector de pantalla. Salud de batería al 100%. Se entrega con caja original y factura de compra.',
    state: 'Como nuevo',
    category: 'Tecnología',
    seller: 'Francisco V.',
    date: '12 May 2026',
    img: 'https://www.apple.com/v/iphone-15-pro/d/images/overview/welcome/hero__bdntboqignj6_xlarge.jpg'
  };

  constructor(private route: ActivatedRoute) {}
}
