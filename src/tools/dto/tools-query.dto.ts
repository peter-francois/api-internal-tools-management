import { ToolsOwnerDepartment, ToolsStatus } from "../entities/tool.entity.js";

export class ToolsQueryDto {
  department?: ToolsOwnerDepartment;
  status?: ToolsStatus;
  min_cost?: number;
  max_cost?: number;
  category?: string;
}
