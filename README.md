# Documentación del Proyecto

## Descripción General

### Backend:

- Construido con Laravel, configurado como una API RESTful que utiliza tokens para autenticación y autorización.
- Implementación de roles para gestionar los permisos y accesos.
- Endpoints organizados para soportar operaciones CRUD, autenticación y gestión de usuarios.

### Frontend:

- Desarrollado con React, consumiendo los endpoints de la API.
- Uso de rutas para gestionar la navegación entre las diferentes vistas.
- Manejo de estados mediante React hooks para gestionar la interacción dinámica.
- Comunicación con la API utilizando Axios para realizar solicitudes HTTP.

## Características

### Autenticación y Roles

- Registro, inicio de sesión y cierre de sesión de usuarios mediante tokens.
- Gestión de roles (administrador y developer) para acceso controlado a funcionalidades.

### Consumo de API REST

- Solicitudes HTTP para obtener, crear, actualizar y eliminar datos.
- Seguridad basada en tokens para proteger los endpoints.

### Frontend React

- Navegación fluida entre vistas gracias a react-router-dom.
- Manejo eficiente del estado de la aplicación utilizando hooks como useState y useEffect
- Componentes diseñados para maximizar la reutilización y facilidad de mantenimiento.

### Comunicación Backend-Frontend

-Axios utilizado para simplificar las solicitudes HTTP y gestionar respuestas y errores.

