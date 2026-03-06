import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ValidationPipe } from "@nestjs/common";
import { PrismaExeptionFilter } from "./utils/prisma-exeption.filter.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
