import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateToolDto } from "./dto/create-tool.dto.js";
import { UpdateToolDto } from "./dto/update-tool.dto.js";
import { type toolsWhereInput } from "../generated/prisma/models.js";
import { Prisma } from "../generated/prisma/client.js";
import { THIRTY_DAYS_IN_MS } from "../utils/variables.js";

@Injectable()
export class ToolsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createTool(dto: CreateToolDto) {
    return this.prismaService.tools.create({ data: dto });
  }

  async findCategory(id: number) {
    return this.prismaService.categories.findUnique({ where: { id } });
  }
  async findCategoryByName(name: string) {
    return this.prismaService.categories.findUnique({ where: { name } });
  }

  async findAllTools(
    filters: toolsWhereInput,
    skip: number,
    limit: number,
    sortBy: string,
    sortOrder: Prisma.SortOrder,
  ) {
    return this.prismaService.$transaction([
      this.prismaService.tools.count(),
      this.prismaService.tools.count({ where: filters }),
      this.prismaService.tools.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
    ]);
  }

  async findToolById(id: number) {
    return this.prismaService.tools.findUniqueOrThrow({ where: { id } });
  }

  async findToolUsageMetrics(id: number) {
    return this.prismaService.usage_logs.aggregate({
      where: {
        tool_id: id,
        session_date: { gte: new Date(Date.now() - THIRTY_DAYS_IN_MS) },
      },
      _count: { id: true },
      _avg: { usage_minutes: true },
    });
  }

  async updateTool(id: number, dto: UpdateToolDto) {
    return this.prismaService.tools.update({ where: { id }, data: dto });
  }

  async deleteTool(id: number) {
    return this.prismaService.tools.delete({ where: { id } });
  }
}
