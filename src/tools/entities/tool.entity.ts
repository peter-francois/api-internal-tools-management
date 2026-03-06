import { ApiProperty } from "@nestjs/swagger";
import { tools_owner_department, tools_status } from "../../generated/prisma/enums.js";
import { type toolsWhereInput } from "src/generated/prisma/models.js";

export class Tool {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  vendor: string | null;

  @ApiProperty()
  website_url: string | null;

  @ApiProperty()
  category_id: number;

  @ApiProperty()
  monthly_cost: number;

  @ApiProperty()
  active_users_count: number;

  @ApiProperty({ enum: tools_owner_department })
  owner_department: tools_owner_department | null;

  @ApiProperty({ enum: tools_status })
  status: tools_status | null;

  @ApiProperty()
  created_at: Date | null;

  @ApiProperty()
  updated_at: Date | null;
}

export class ToolsFindAllMeta {
  @ApiProperty()
  total: number;
  @ApiProperty()
  filtered: number;
  @ApiProperty({
    example: { min_cost: 10, max_cost: 50, category: "Development" },
  })
  filters_applied: toolsWhereInput;
}
class UsageMetrics {
  last_30_days: Last30DaysMetrics;
}

export class ToolsFindOneByIdResponse extends Tool {
  @ApiProperty({ type: () => UsageMetrics })
  usage_metrics: UsageMetrics;
}

class Last30DaysMetrics {
  total_sessions: number;
  avg_session_minutes: number;
}