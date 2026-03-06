import { ApiProperty } from "@nestjs/swagger";

export enum ToolsOwnerDepartment {
  Engineering = "Engineering",
  Sales = "Sales",
  Marketing = "Marketing",
  HR = "HR",
  Finance = "Finance",
  Operations = "Operations",
  Design = "Design",
}

export enum ToolsStatus {
  ACTIVE = "active",
  DEPRECATED = "deprecated",
  TRIAL = "trial",
}

export class Tool {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  vendor?: string;

  @ApiProperty()
  website_url?: string;

  @ApiProperty()
  category_id: number;

  @ApiProperty()
  monthly_cost: number;

  @ApiProperty()
  active_users_count: number;

  @ApiProperty({ enum: ToolsOwnerDepartment })
  owner_department: ToolsOwnerDepartment;

  @ApiProperty({ enum: ToolsStatus })
  status?: ToolsStatus;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;
}
