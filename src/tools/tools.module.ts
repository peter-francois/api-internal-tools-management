import { Module } from "@nestjs/common";
import { ToolsController } from "./tools.controller.js";
import { ToolsService } from "./tools.service.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { ToolsRepository } from "./tools.repository.js";

@Module({
  controllers: [ToolsController],
  providers: [ToolsService, PrismaService, ToolsRepository],
})
export class ToolsModule {}
