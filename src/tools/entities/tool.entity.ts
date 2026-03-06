import { ApiProperty } from "@nestjs/swagger";
import { tools_owner_department, tools_status } from "../../generated/prisma/enums.js";

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
