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
import { ToolsFindAllMeta, ToolsService } from "./tools.service.js";
import { ToolsQueryDto } from "./dto/tools-query.dto.js";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SuccessResponseFactory } from "../utils/success-response.factory.js";
import { Tool } from "./entities/tool.entity.js";
import { TOOLS_FIND_ALL_EXAMPLE } from "../utils/tools.example.js";

@ApiTags("tools")
@Controller("tools")
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

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
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.toolsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(+id, updateToolDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.toolsService.remove(+id);
  }
}
