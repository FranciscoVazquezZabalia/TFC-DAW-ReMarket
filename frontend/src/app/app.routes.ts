import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Catalog } from './pages/catalog/catalog';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Profile } from './pages/profile/profile';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'catalog', component: Catalog },
  { path: 'product/:id', component: ProductDetail },

  // Rutas privadas: el authGuard redirige a /login si el usuario no está autenticado
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  // { path: 'crear-producto', component: CrearProducto, canActivate: [authGuard] }, // añadir cuando exista el componente

  { path: '**', redirectTo: '' }
];
