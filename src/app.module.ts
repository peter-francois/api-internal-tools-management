import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module.js";
import { ToolsModule } from "./tools/tools.module.js";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, ToolsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
