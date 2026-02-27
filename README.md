# NestJS Advanced Boilerplate

A production-ready [NestJS](https://nestjs.com/) boilerplate designed with a clean architecture, scalability, and best practices in mind.

## 🌟 Features

- **Standardized Folder Structure**: Modular separation with `common`, `modules`, `bootstrap`, and `config`.
- **Swagger Integration**: Automated API documentation using `DocumentBuilder`, available at `/api/docs`.
- **Health Checks**: System diagnostic endpoints via `@nestjs/terminus` (Heap memory check included).
- **Core API Decorators**: Built-in decorators for access control (`@IsPublic`) and response formatting (`@CoreApiResponse`).
- **Global Exception Handling**: Centralized `HttpExceptionFilter` for consistent error responses.
- **Request/Response Transformation**: `TransformInterceptor` for standardizing API response structures.
- **Validation Pipes**: Global validation and transformation via `class-validator` and `class-transformer`.
- **Clean Main Entry**: Isolated bootstrapping process for better separation of concerns.

## 📂 Project Structure

```
src/
├── app.module.ts                   # Root application module
├── main.ts                         # Application entry point
├── bootstrap/                      # Application initialization logic
│   └── index.ts                    # Main bootstrap orchestration
├── config/                         # Centralized configurations
│   ├── globals.setup.ts            # Pipes, filters, and interceptors setup
│   └── swagger.setup.ts            # Swagger UI configuration
├── common/                         # Reusable logic across modules
│   ├── decorators/                 # Custom decorators (IsPublic, CoreApiResponse)
│   ├── filters/                    # Global exception filters (HttpExceptionFilter)
│   └── interceptors/               # Request/Response interceptors (TransformInterceptor)
└── modules/                        # Feature-based business logic
    └── health/                     # System health check module
        ├── health.controller.ts    # Health check endpoints
        └── health.module.ts        # Health module definition
```

## 🛠 Prerequisites

- Node.js (>= 20)
- NPM or Yarn

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Application**
   ```bash
   # Development mode
   npm run start

   # Watch mode (recommended for dev)
   npm run start:dev

   # Production mode
   npm run start:prod
   ```

## 🌐 API Accessibility

Once the server is running, you can access:

- **Base Application**: `http://localhost:3000`
- **Swagger API Docs**: `http://localhost:3000/api/docs`
- **Health Endpoint**: `http://localhost:3000/health` (or `http://localhost:3000/` for a quick check)

## ⚙️ How to Add a New Module

Generate new feature modules using the Nest CLI:
```bash
# Generate a core module
nest g module modules/new_module_name
nest g controller modules/new_module_name
nest g service modules/new_module_name
```

## 📖 License

This project is [UNLICENSED](LICENSE).
