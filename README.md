# Plataforma de Compraventa de Segunda Mano

Trabajo de Fin de Ciclo — Desarrollo de Aplicaciones Web  
Autor: Francisco Vázquez Zabalia

---

## Descripcion del proyecto

Aplicacion web de tipo Marketplace orientada a la compraventa de articulos de segunda mano entre particulares. La plataforma permite a los usuarios registrarse, publicar productos, buscar articulos mediante filtros y gestionar el proceso de compra y valoracion entre usuarios.

El proyecto esta dividido en dos partes bien diferenciadas: un Frontend construido con Angular que consume una API REST desarrollada con Spring Boot en el Backend.

---

## Tecnologias utilizadas

**Frontend**
- Angular con TypeScript
- Bootstrap para los estilos y el diseño responsive
- Comunicacion con el backend mediante servicios HTTP y autenticacion por token JWT

**Backend**
- Java 21 con Spring Boot
- Spring Data JPA para la capa de acceso a datos
- Spring Security con autenticacion basada en JWT
- MySQL como base de datos relacional

**Herramientas**
- Postman para las pruebas de la API
- phpMyAdmin para la administracion de la base de datos
- Visual Studio Code como editor principal
- Git y GitHub para el control de versiones

---

## Funcionalidades principales

- Registro e inicio de sesion de usuarios con autenticacion JWT
- Gestion de perfil de usuario
- Publicacion, edicion y eliminacion de productos (con titulo, descripcion, precio, estado y fotos)
- Marcado de productos como vendidos
- Catalogo con buscador por palabras clave y filtros por precio, categoria y estado
- Sistema de transacciones: el comprador puede iniciar una compra o reserva
- Sistema de valoraciones mutuas entre comprador y vendedor al completar una transaccion

---

## Estructura de la base de datos

El modelo relacional esta formado por 4 tablas principales:

- **usuarios** — Almacena los datos de los usuarios registrados
- **productos** — Cada producto pertenece a un usuario (relacion 1:N)
- **transacciones** — Conecta a un comprador con un producto concreto
- **valoraciones** — Vinculada a una transaccion; guarda la puntuacion entre usuarios

---

## Estructura del repositorio

```
/
├── frontend/       # Proyecto Angular
└── backend/        # Proyecto Spring Boot
```

---

## Instalacion y puesta en marcha

### Requisitos previos

- Node.js y Angular CLI instalados
- JDK 21
- MySQL en ejecucion

### Base de datos

1. Crear una base de datos en MySQL
2. Importar el script SQL incluido en `/backend/src/main/resources/data.sql`
3. Ajustar las credenciales en `/backend/src/main/resources/application.properties`

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

El servidor arranca por defecto en `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
ng serve
```

La aplicacion queda disponible en `http://localhost:4200`

---

## Endpoints principales de la API

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | /api/auth/register | Registro de usuario |
| POST | /api/auth/login | Inicio de sesion, devuelve el token |
| GET | /api/productos | Listado de productos con filtros |
| POST | /api/productos | Publicar un nuevo producto |
| PUT | /api/productos/{id} | Editar un producto |
| DELETE | /api/productos/{id} | Eliminar un producto |
| POST | /api/transacciones | Iniciar una compra |
| POST | /api/valoraciones | Dejar una valoracion |

---

## Control de versiones

El proyecto se ha desarrollado siguiendo una estructura de commits organizados por bloques funcionales, con mensajes descriptivos y en español. Cada commit agrupa cambios coherentes de una misma parte del sistema.
