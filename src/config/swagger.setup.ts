/**
 * Swagger / OpenAPI Bootstrap
 *
 * Sets up the Swagger UI at /api/docs.
 * Configures the document builder, endpoint tags, and display options.
 */

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerTag } from '@shared/constants/swagger.constant';

/**
 * Initializes and configures Swagger for the NestJS application
 *
 * @param app The NestJS application instance
 */
export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('NestJS Application API')
    .setDescription(
      `**NestJS Template** — Core backend application.\n\n` +
        `> 💡 **Note**: This documentation outlines the HTTP REST API endpoints, DTO schemas, and system diagnostics.\n\n` +
        `**Key Features:**\n` +
        `- \`RESTful Structure\`\n` +
        `- \`Standardized Responses\`\n` +
        `- \`TypeORM Integration\``,
    )
    .setVersion('1.0.0')
    .addServer('http://localhost:3000', 'Local - Development')
    .addServer('https://dev-api.example.com', 'Dev - Staging')
    .addServer('https://api.example.com', 'Production - Enterprise')
    .addTag(SwaggerTag.SYSTEM, 'System diagnostic and health endpoints')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
    },
    customSiteTitle: 'NestJS Template API',
  });
}
