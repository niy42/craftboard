import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Create the Nest.js application
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  logger.log('CORS enabled');

  // Initialize Prisma connection
  const prismaService = app.get(PrismaService);
  await prismaService.$connect();
  logger.log('Database connected successfully');

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Craftboard API')
    .setDescription('API for Craftboard task management')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  logger.log('Swagger documentation set up at /api');

  // Start the application
  const port = 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Application failed to start', error.stack);
  process.exit(1);
});