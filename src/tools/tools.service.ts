import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateToolDto } from "./dto/create-tool.dto.js";
import { UpdateToolDto } from "./dto/update-tool.dto.js";
import { ToolsQueryDto, ToolsSortBy } from "./dto/tools-query.dto.js";
import { toolsWhereInput } from "../generated/prisma/models.js";
import { Prisma, tools } from "../generated/prisma/client.js";
import { THIRTY_DAYS_IN_MS } from "../utils/variables.js";

class ToolsFindAllResponse {
  data: tools[];
  total: number;
  filtered: number;
  filters_applied: toolsWhereInput;
}

type ToolsFindOneByIdResponse = tools & {
  usage_metrics: UsageMetrics;
};

class UsageMetrics {
  last_30_days: Last30DaysMetrics;
}

class Last30DaysMetrics {
  total_sessions: number;
  avg_session_minutes: number;
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

  async findOne(id: number): Promise<ToolsFindOneByIdResponse> {
    const [tool, usageMetrics] = await this.prismaService.$transaction([
      this.prismaService.tools.findUniqueOrThrow({ where: { id } }),
      this.prismaService.usage_logs.aggregate({
        where: {
          tool_id: id,
          session_date: { gte: new Date(Date.now() - THIRTY_DAYS_IN_MS) },
        },
        _count: { id: true },
        _avg: { usage_minutes: true },
      }),
    ]);

    return {
      ...tool,
      usage_metrics: {
        last_30_days: {
          total_sessions: usageMetrics._count.id,
          avg_session_minutes: Math.round(usageMetrics._avg.usage_minutes ?? 0),
        },
      },
    };
  }

  update(id: number, updateToolDto: UpdateToolDto) {
    return `This action updates a #${id} tool`;
  }

  remove(id: number) {
    return `This action removes a #${id} tool`;
  }
}
