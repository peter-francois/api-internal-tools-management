import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateToolDto } from "./dto/create-tool.dto.js";
import { UpdateToolDto } from "./dto/update-tool.dto.js";
import { ToolsQueryDto, ToolsSortBy } from "./dto/tools-query.dto.js";
import { type toolsWhereInput } from "../generated/prisma/models.js";
import { Prisma, tools } from "../generated/prisma/client.js";
import { SuccessResponseInterface } from "../utils/response.interface.js";
import {
  ToolsCreateOrUpdateResponse,
  ToolsFindAllMeta,
  ToolsFindOneByIdResponse,
} from "./entities/tool.entity.js";
import { ToolsRepository } from "./tools.repository.js";

@Injectable()
export class ToolsService {
  constructor(private readonly prismaService: PrismaService, private readonly toolsRepository: ToolsRepository) {}

  async create(
    createToolDto: CreateToolDto,
  ): Promise<SuccessResponseInterface<ToolsCreateOrUpdateResponse>> {
    const category = this.toolsRepository.findCategory(createToolDto.category_id);
    if (!category) throw new NotFoundException(`Category ${createToolDto.category_id} not found`);

    const tool = await await this.toolsRepository.createTool(createToolDto);
    return {
      data: { ...tool, monthly_cost: tool.monthly_cost.toNumber() },
    };
  }

  async findAll(
    query: ToolsQueryDto,
  ): Promise<SuccessResponseInterface<tools[], ToolsFindAllMeta>> {
    const {
      category,
      page = 1,
      limit = 20,
      sortBy = ToolsSortBy.NAME,
      sortOrder = Prisma.SortOrder.asc,
    } = query;
    let categoryId: number | undefined;
    if (category) {
      const categoryRecord = await this.toolsRepository.findCategoryByName(category);
      if (!categoryRecord) {
        return { data: [], meta: { total: 0, filtered: 0, filters_applied: query } };
      }
      categoryId = categoryRecord.id;
    }

    const filters = this.buildFilters(query, categoryId);
    const skip = (page - 1) * limit;

    const [total, filtered, data] = await this.toolsRepository.findAllTools(
      filters,
      skip,
      limit,
      sortBy,
      sortOrder,
    );

    return { data, meta: { total, filtered, filters_applied: query } };
  }

  private buildFilters(query: ToolsQueryDto, categoryId?: number): toolsWhereInput {
    const { department, status, min_cost, max_cost } = query;
    const filters: toolsWhereInput = {};

    if (department) filters.owner_department = department;
    if (status) filters.status = status;
    if (min_cost || max_cost) {
      filters.monthly_cost = {};
      if (min_cost) filters.monthly_cost.gte = min_cost;
      if (max_cost) filters.monthly_cost.lte = max_cost;
    }
    if (categoryId) filters.category_id = categoryId;

    return filters;
  }

  async findOne(id: number): Promise<SuccessResponseInterface<ToolsFindOneByIdResponse>> {
    const tool = await this.toolsRepository.findToolById(id);
    const usageMetrics = await this.toolsRepository.findToolUsageMetrics(id);
    const data: ToolsFindOneByIdResponse = {
      ...tool,
      monthly_cost: tool.monthly_cost.toNumber(),
      usage_metrics: {
        last_30_days: {
          total_sessions: usageMetrics._count.id,
          avg_session_minutes: Math.round(usageMetrics._avg.usage_minutes ?? 0),
        },
      },
    };

    return { data };
  }

  async update(
    id: number,
    updateToolDto: UpdateToolDto,
  ): Promise<SuccessResponseInterface<ToolsCreateOrUpdateResponse>> {
    await this.toolsRepository.findToolById(id);

    const tool = await this.toolsRepository.updateTool(id, updateToolDto);
    return { data: { ...tool, monthly_cost: tool.monthly_cost.toNumber() } };
  }

  async remove(id: number): Promise<void> {
    await this.toolsRepository.findToolById(id);
    await this.toolsRepository.deleteTool(id);
  }
}
