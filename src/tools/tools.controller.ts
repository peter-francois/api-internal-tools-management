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
} from "../utils/tools.example.js";

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
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.toolsService.findOne(id);
  }

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
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(id, updateToolDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.toolsService.remove(+id);
  }
}
