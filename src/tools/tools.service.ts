import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateToolDto } from "./dto/create-tool.dto.js";
import { UpdateToolDto } from "./dto/update-tool.dto.js";

@Injectable()
export class ToolsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createToolDto: CreateToolDto) {
    return "This action adds a new tool";
  }

  findAll() {
    return this.prisma.tools.findMany();
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
