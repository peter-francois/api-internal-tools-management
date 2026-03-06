import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ValidationPipe } from "@nestjs/common";
import { PrismaExeptionFilter } from "./utils/prisma-exeption.filter.js";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Tools Management API")
    .setDescription("API to manage tools, costs, and usage metrics")
    .setVersion("1.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: process.env.NODE_ENV !== "development",
    }),
  );
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new PrismaExeptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
