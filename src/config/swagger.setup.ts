import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerTag } from '@shared/constants/swagger.constant';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('NestJS API Boilerplate')
    .setDescription('The API description and documentation')
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
    },
  });
}
