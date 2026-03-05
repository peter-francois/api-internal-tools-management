import { CreateToolDto } from "./dto/create-tool.dto.js";
import { UpdateToolDto } from "./dto/update-tool.dto.js";

export class ToolsService {
  create(createToolDto: CreateToolDto) {
    return "This action adds a new tool";
  }

  findAll() {
    return `This action returns all tools`;
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
