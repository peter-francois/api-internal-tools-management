import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { tools_owner_department, tools_status } from "../../generated/prisma/enums.js";
import { type toolsWhereInput } from "src/generated/prisma/models.js";

export class Tool {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: "GitHub" })
  name: string;

  @ApiProperty({ example: "Version control and collaboration", nullable: true })
  description: string | null;

  @ApiProperty({ example: "GitHub Inc.", nullable: true })
  vendor: string | null;

  @ApiProperty({ example: "https://github.com", nullable: true })
  website_url: string | null;

  @ApiProperty({ example: 2 })
  category_id: number;

  @ApiProperty({ example: 21.0 })
  monthly_cost: number;

  @ApiProperty()
  active_users_count: number;

  @ApiProperty({ enum: tools_owner_department })
  owner_department: tools_owner_department | null;

  @ApiProperty({ enum: tools_status })
  status: tools_status | null;

  @ApiProperty({ example: "2026-03-05T14:24:27.000Z", nullable: true })
  created_at: Date | null;

  @ApiProperty({ example: "2026-03-05T14:24:27.000Z", nullable: true })
  updated_at: Date | null;
}

export class ToolsFindAllMeta {
  @ApiProperty({ example: 24 })
  total: number;

  @ApiProperty({ example: 2 })
  filtered: number;

  @ApiProperty({
    example: { min_cost: 10, max_cost: 50, category: "Development" },
  })
  filters_applied: toolsWhereInput;
}
class Last30DaysMetrics {
  @ApiProperty({ example: 127 })
  total_sessions: number;

  @ApiProperty({ example: 45 })
  avg_session_minutes: number;
}

class UsageMetrics {
  @ApiProperty({ type: () => Last30DaysMetrics })
  last_30_days: Last30DaysMetrics;
}

export class ToolsFindOneByIdResponse extends Tool {
  @ApiProperty({ type: () => UsageMetrics })
  usage_metrics: UsageMetrics;
}
export class ToolsCreateOrUpdateResponse extends Tool {
  @ApiHideProperty()
  declare category_id: number;
}
