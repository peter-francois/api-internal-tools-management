import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateToolDto } from "./dto/create-tool.dto.js";
import { UpdateToolDto } from "./dto/update-tool.dto.js";
import { ToolsQueryDto, ToolsSortBy } from "./dto/tools-query.dto.js";
import { toolsWhereInput } from "../generated/prisma/models.js";
import { Prisma, tools } from "../generated/prisma/client.js";

class ToolsFindAllResponse {
  data: tools[];
  total: number;
  filtered: number;
  filters_applied: toolsWhereInput;
}

@Injectable()
export class ToolsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createToolDto: CreateToolDto) {
    return "This action adds a new tool";
  }

  async findAll(query: ToolsQueryDto): Promise<ToolsFindAllResponse> {
    const {
      department,
      status,
      min_cost,
      max_cost,
      category,
      page = 1,
      limit = 20,
      sortBy = ToolsSortBy.NAME,
      sortOrder = Prisma.SortOrder.asc,
    } = query;
    const filters: toolsWhereInput = {};

    if (department) filters.owner_department = department;
    if (status) filters.status = status;
    if (min_cost || max_cost) {
      filters.monthly_cost = {};
      if (min_cost) filters.monthly_cost.gte = min_cost;
      if (max_cost) filters.monthly_cost.lte = max_cost;
    }
    if (category) {
      const categoryRecord = await this.prismaService.categories.findUnique({
        where: { name: category },
      });
      if (categoryRecord) {
        filters.category_id = categoryRecord.id;
      } else {
        return { data: [], total: 0, filtered: 0, filters_applied: query };
      }
    }
    const skip = (page - 1) * limit;

    const [total, filtered, data] = await this.prismaService.$transaction([
      this.prismaService.tools.count(),
      this.prismaService.tools.count({ where: filters }),
      this.prismaService.tools.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
    ]);

    return { data, total, filtered, filters_applied: query };
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
