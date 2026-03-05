import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateToolDto } from "./dto/create-tool.dto.js";
import { UpdateToolDto } from "./dto/update-tool.dto.js";
import { ToolsQueryDto } from "./dto/tools-query.dto.js";
import { toolsWhereInput } from "src/generated/prisma/models.js";
import { tools_owner_department, tools_status } from "src/generated/prisma/enums.js";

@Injectable()
export class ToolsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createToolDto: CreateToolDto) {
    return "This action adds a new tool";
  }

  async findAll(query: ToolsQueryDto) {
    const {
      department,
      status,
      min_cost,
      max_cost,
      category,
      page = 1,
      limit = 20,
      sortBy = "name",
      sortOrder = "asc",
    } = query;
    const filters: toolsWhereInput = {};
    if (department) filters.owner_department = department as tools_owner_department;
    if (status) filters.status = status as tools_status;
    if (min_cost || max_cost) {
      filters.monthly_cost = {};
      if (min_cost) filters.monthly_cost.gte = min_cost;
      if (max_cost) filters.monthly_cost.lte = max_cost;
    }
    if (category) {
      const categoryRecord = await this.prisma.categories.findUnique({
        where: { name: category },
      });
      if (categoryRecord) {
        filters.category_id = categoryRecord.id;
      } else {
        return { data: [], total: 0 };
      }
    }

    const skip = (page - 1) * limit;

    const total = await this.prisma.tools.count();
    const filtered = await this.prisma.tools.count({ where: filters });
    const data = await this.prisma.tools.findMany({
      where: filters,
      include: category ? { categories: true } : undefined,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    });

    return { data, total, filtered, filters_applied: filters };
  }

  findOne(id: number) {
    return `This action returns a #${id} tool`;
  }

  update(id: number, updateToolDto: UpdateToolDto) {
    return `This action updates a #${id} tool`;
  }

  remove(id: number) {
    return `This action removes a #${id} tool`;
  }
}
