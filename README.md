# NestJS Advanced Boilerplate

A production-ready [NestJS](https://nestjs.com/) boilerplate designed with a clean architecture, scalability, and best practices in mind.

## 🌟 Features

- **Standardized Folder Structure**: Modular separation with `common`, `modules`, `bootstrap`, `shared`, and `config`.
- **Path Aliases**: Pre-configured TypeScript path aliases (`@config/*`, `@common/*`, `@modules/*`, `@shared/*`, `@/*`) for cleaner imports.
- **Swagger Integration**: Automated API documentation using `DocumentBuilder`, available at `/api/docs`.
- **Health Checks**: System diagnostic endpoints via `@nestjs/terminus` (Heap memory and Database connectivity checks included).
- **TypeORM & PostgreSQL**: Robust database integration with automatic **snake_case** column mapping using `SnakeNamingStrategy`.
- **Base CRUD Service**: Abstract base service to reduce boilerplate for common database operations.
- **Type-safe Data Mapping**: Generic `mapper.util.ts` for consistent DTO/Entity transformations.
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
│   ├── swagger.setup.ts            # Swagger UI configuration
│   └── database.config.ts          # TypeORM configuration
├── common/                         # Reusable logic across modules
│   ├── decorators/                 # Custom decorators (IsPublic, CoreApiResponse)
│   ├── filters/                    # Global exception filters (HttpExceptionFilter)
│   ├── interceptors/               # Request/Response interceptors (TransformInterceptor)
│   └── services/                   # Base services and abstract classes
├── database/                       # Database-specific files
│   ├── migrations/                 # TypeORM migrations
│   └── data-source.ts              # CLI Data Source configuration
├── modules/                        # Feature-based business logic
│   └── health/                     # System health check module
└── shared/                         # Cross-cutting utilities and types
    ├── constants/                  # Global constants and enums
    ├── types/                      # Shared TS interfaces and types
    └── utils/                      # Generic utility functions (Mapper, Dates)
```

## 🛠 Prerequisites

- Node.js (>= 20)
- NPM or Yarn
- Docker & Docker Compose (for database and containerization)

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   * Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   * The default settings in `.env.example` are pre-configured to work with the Docker PostgreSQL container.
   * Start the database:
     ```bash
     docker compose up db -d
     ```
   * Run migrations to create the initial tables:
     ```bash
     npm run migration:run
     ```

3. **Run the Application**
   ```bash
   # Development mode
   npm run start

   # Watch mode (recommended for dev)
   npm run start:dev

   # Production mode
   npm run start:prod
   ```

## ✅ Verification

To confirm everything is set up correctly:

1. **Terminal**: Check the logs for `[Bootstrap] Database connection established successfully`.
2. **Health Check**: Visit `http://localhost:3000/health`. You should see a `"database": { "status": "up" }` entry.
3. **Swagger API Docs**: Visit `http://localhost:3000/api/docs`.
4. **Database**: Use a tool like **DBeaver** to verify connectivity to the configured database.

## 🐳 Docker Support

This project includes enterprise-level Docker configurations for development, testing, and production.

### Development (with hot-reloading)
```bash
docker compose up
```
The application will be available at `http://localhost:3000`. Changes in your local files will trigger a restart inside the container.

### Production Build & Run
```bash
# Build the production image
docker build -t nest-js-template .

# Run with production-grade settings
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Running Tests in Docker
```bash
docker compose -f docker-compose.test.yml up --exit-code-from test
```

## 🗄 Database Migrations

This project uses TypeORM for database management. A singleton `DataSource` is configured in `src/database/data-source.ts` for CLI usage.

### Migration Commands
```bash
# Create a new empty migration
npm run migration:create --name=MigrationName

# Generate a migration based on entity changes
npm run migration:generate --name=MigrationName

# Run pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert
```

> [!TIP]
> When running `migration:generate`, ensure your application is built (`npm run build`) and the database is accessible.

### Features of the Docker setup:
- **Multi-stage Build**: Minimizes image size and secures source code.
- **Unprivileged User**: Runs the application as a non-root `node` user.
- **Health Checks**: Integrated Docker health checks using the `/health` endpoint.
- **Resource Limits**: Defined CPU and memory constraints for production stability.
- **Layer Caching**: Optimized for fast rebuilds.
- **Environment Isolation**: Separate configurations for dev, test, and prod.

## 🌐 API Accessibility

Once the server is running, you can access:

- **Base Application**: `http://localhost:3000`
- **Swagger API Docs**: `http://localhost:3000/api/docs`
- **Health Endpoint**: `http://localhost:3000/health`

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
