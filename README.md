# 🚗 Sistema de Gestión de Parqueaderos

Este proyecto es una API REST desarrollada en **Node.js con Express y Sequelize** que permite la gestión de parqueaderos, vehículos y entradas/salidas de forma controlada.  
Incluye autenticación con **JWT**, asignación de parqueaderos a usuarios y control de capacidad.

---

## 📌 Características principales
- Registro e inicio de sesión de usuarios.
- Usuario **admin** precargado para gestión inicial.
- CRUD de parqueaderos asociados a cada usuario.
- Registro de ingresos y salidas de vehículos.
- Consulta de vehículos actualmente dentro de un parqueadero.
- Reportes (ej. top 10 vehículos más registrados).
- Autenticación con **JWT** y protección de rutas.
- Base de datos en **MySQL** usando **Sequelize ORM**.

---

## 📦 Requisitos previos
Antes de correr el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v16 o superior recomendado)  
- [MySQL](https://dev.mysql.com/downloads/) (v8 recomendado)  
- [Git](https://git-scm.com/)  

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/FranklinRonquillo/Parqueadero.git

## Inicializar proyecto

npm install

## Correr proyecto

npm start

## Estructura del proyecto

src/
 ├── controller/           # Lógica de negocio de cada entidad
 │   ├── entradas.controller.js
 │   ├── indicadores.controller.js
 │   ├── login.controller.js
 │   ├── parqueaderos.controller.js
 │   ├── usuarios.controller.js
 │   └── vehiculos.controller.js
 │
 ├── database/             # Configuración de la base de datos
 │   └── db.js
 │
 ├── middleware/           # Middlewares (auth, validaciones, etc.)
 │   └── verificacion.js
 │
 ├── models/               # Modelos Sequelize
 │   ├── entrada.js
 │   ├── parqueadero.js
 │   ├── relaciones.js
 │   ├── usuario.js
 │   └── vehiculo.js
 │
 ├── routes/               # Definición de rutas
 │   ├── entradas.routes.js
 │   ├── indicadores.routes.js
 │   ├── login.routes.js
 │   ├── parqueaderos.routes.js
 │   ├── usuarios.routes.js
 │   └── vehiculos.routes.js
 │
 └── index.js              # Punto de entrada principal

## Modelo entidad relación y la coleccion de postman estan en el repositorio




