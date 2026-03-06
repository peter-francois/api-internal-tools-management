import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
} from "@nestjs/common";
import { CreateToolDto } from "./dto/create-tool.dto.js";
import { UpdateToolDto } from "./dto/update-tool.dto.js";
import { ToolsService } from "./tools.service.js";
import { ToolsQueryDto } from "./dto/tools-query.dto.js";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SuccessResponseFactory } from "../utils/success-response.factory.js";
import {
  Tool,
  ToolsCreateOrUpdateResponse,
  ToolsFindAllMeta,
  ToolsFindOneByIdResponse,
} from "./entities/tool.entity.js";
import {
  TOOLS_CREATE_BODY_EXAMPLE,
  TOOLS_CREATE_OR_UPDATE_EXAMPLE,
  TOOLS_FIND_ALL_EXAMPLE,
  TOOLS_UPDATE_BODY_EXAMPLE,
} from "./tools.examples.js";

@ApiTags("tools")
@Controller("tools")
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @ApiOperation({ summary: "Create a new tool" })
  @ApiBody({
    type: CreateToolDto,
    examples: TOOLS_CREATE_BODY_EXAMPLE,
  })
  @ApiResponse({
    status: 201,
    type: SuccessResponseFactory(ToolsCreateOrUpdateResponse),
    example: TOOLS_CREATE_OR_UPDATE_EXAMPLE,
  })
  @Post()
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tools with optional filters" })
  @ApiResponse({
    status: 200,
    description: "List of tools with meta",
    type: SuccessResponseFactory(Tool, ToolsFindAllMeta),
    example: TOOLS_FIND_ALL_EXAMPLE,
  })
  @ApiResponse({ status: 404, description: "Tool not found" })
  findAll(@Query() query: ToolsQueryDto) {
    return this.toolsService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get all tools with optional filters" })
  @ApiResponse({
    status: 200,
    description: "The tool with usage metrics",
    type: SuccessResponseFactory(ToolsFindOneByIdResponse),
    example: TOOLS_FIND_ALL_EXAMPLE,
  })
  @ApiResponse({ status: 404, description: "Tool not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.toolsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Get all tools with optional filters" })
  @ApiBody({
    type: UpdateToolDto,
    examples: TOOLS_UPDATE_BODY_EXAMPLE,
  })
  @ApiResponse({
    status: 201,
    type: SuccessResponseFactory(ToolsCreateOrUpdateResponse),
    example: TOOLS_CREATE_OR_UPDATE_EXAMPLE,
  })
  @ApiResponse({ status: 404, description: "Tool not found" })
  update(@Param("id", ParseIntPipe) id: number, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(id, updateToolDto);
  }

  @ApiOperation({ summary: "Delete a tool by ID" })
  @ApiResponse({ status: 204, description: "Tool successfully deleted" })
  @ApiResponse({ status: 404, description: "Tool not found" })
  @HttpCode(204)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.toolsService.remove(id);
  }
}
