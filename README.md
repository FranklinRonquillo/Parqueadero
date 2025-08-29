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
git clone https://github.com/tu-usuario/sistema-parqueaderos.git
cd sistema-parqueaderos
