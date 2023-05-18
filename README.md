# API de Autenticación - README

Esta es una API de Autenticación basada en Node.js, Express, TypeScript, JSON Web Token, Mongoose y Bcrypt.js. Proporciona tres endpoints principales:

- `/api/auth/signup`: Registra un nuevo usuario en la base de datos.
- `/api/auth/signin`: Autentica a un usuario existente y devuelve un token de acceso JWT.
- `/api/auth/profile`: Obtiene los datos del perfil de un usuario autenticado.

## Uso

1. Instale las dependencias utilizando `npm install`.
2. Configure las variables de entorno en el archivo `.env`.
3. Inicie el servidor con `npm run dev`.
4. La API estará disponible en `http://localhost:4000`.

## Endpoints

### Registrar - POST /api/auth/signup

- Body: user, email, password
- Respuesta exitosa: Usuario registrado exitosamente
- Respuesta de error: El usuario ya existe

### Autenticar - POST /api/auth/signin

- Body: email, password
- Respuesta exitosa: Token de acceso JWT
- Respuesta de error: Credenciales inválidas

### Perfil de usuario - GET /api/auth/profile

- Encabezados: Authorization: Bearer <token>.
