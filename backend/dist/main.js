"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    logger.log('CORS enabled');
    const prismaService = app.get(prisma_service_1.PrismaService);
    await prismaService.$connect();
    logger.log('Database connected successfully');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Craftboard API')
        .setDescription('API for Craftboard task management')
        .setVersion('1.0')
        .addTag('tasks')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    logger.log('Swagger documentation set up at /api');
    const port = 3000;
    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap().catch((error) => {
    const logger = new common_1.Logger('Bootstrap');
    logger.error('Application failed to start', error.stack);
    process.exit(1);
});
//# sourceMappingURL=main.js.map