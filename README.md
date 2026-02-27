# NestJS Advanced Boilerplate

A production-ready [NestJS](https://nestjs.com/) boilerplate designed with a clean architecture, scalability, and best practices in mind.

## 🌟 Features

- **Standardized Folder Structure**: Modular separation with `common`, `modules`, `bootstrap`, etc.
- **Swagger Integration**: Decorator based API documentation, available automatically.
- **Health Checks**: System diagnostic endpoints via `@nestjs/terminus`.
- **Advanced Decorators**: Built-in decorators for access control (`@IsPublic`) and response formatting (`@CoreApiResponse`).
- **Global Validation & Transformation**: Utilizes `class-validator` and `class-transformer` across the application.
- **Exception Filters & Interceptors**: Standardized API responses and error handling using custom filters and interceptors.
- **Separation of Concerns**: Isolated bootstrapping process ensuring a clean `main.ts` file.

## 📂 Project Structure

```
src/
├── app.module.ts                   # Root module
├── bootstrap/                      # Application initialization configuration
│   ├── globals.setup.ts            # Configures global pipes, filters, and interceptors
│   ├── index.ts                    # Main bootstrap function
│   └── swagger.setup.ts            # Centralized swagger configuration
├── common/                         # Reusable logic across modules
│   ├── decorators/                 # Custom decorators (e.g. IsPublic)
│   ├── filters/                    # Global exception filters
│   └── interceptors/               # Global request/response interceptors
├── main.ts                         # Entry point
└── modules/                        # Feature-based business logic modules
    └── health/                     # Built-in health check APIs
        ├── health.controller.ts
        └── health.module.ts
```

## 🛠 Prerequisites

- Node.js (>= 18)
- NPM or Yarn

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Application**
   ```bash
   # development
   npm run start

   # watch mode
   npm run start:dev

   # production mode
   npm run start:prod
   ```

## 🌐 API Accessibility

Once the server is running, you can access:

- **Base Application**: `http://localhost:3000`
- **Swagger API Docs**: `http://localhost:3000/api/docs`
- **Health Endpoint**: `http://localhost:3000/health`

## ⚙️ How to Add a New Module

Generate a new feature module using the Nest CLI to maintain structure:
```bash
nest g module modules/feature_name
nest g controller modules/feature_name
nest g service modules/feature_name
```

## 📖 License

This template is licensed under the [MIT License](LICENSE).
