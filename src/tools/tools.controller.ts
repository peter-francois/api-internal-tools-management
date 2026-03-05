import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { CreateToolDto } from "./dto/create-tool.dto.js";
import { UpdateToolDto } from "./dto/update-tool.dto.js";
import { ToolsService } from "./tools.service.js";
import { ToolsQueryDto } from "./dto/tools-query.dto.js";

@Controller("tools")
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @Get()
  findAll(@Query() query: ToolsQueryDto) {
    return this.toolsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.toolsService.findOne(+id);
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
