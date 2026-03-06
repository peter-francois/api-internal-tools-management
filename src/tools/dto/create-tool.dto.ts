import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { Type } from "class-transformer";
import { tools_owner_department, tools_status } from "../../generated/prisma/enums.js";

export class CreateToolDto {
  @ApiProperty({ example: "GitHub", minLength: 2, maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: "GitHub Inc.", maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  vendor: string;

  @ApiProperty({ example: "Version control and collaboration", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "https://github.com", required: false })
  @IsOptional()
  @IsUrl()
  website_url?: string;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  category_id: number;

  @ApiProperty({ example: 21.00, minimum: 0 })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  monthly_cost: number;

  @ApiProperty({ enum: tools_owner_department, example: tools_owner_department.Engineering })
  @IsNotEmpty()
  @IsEnum(tools_owner_department)
  owner_department: tools_owner_department;

  @ApiProperty({ enum: tools_status, required: false, example: tools_status.active })
  @IsOptional()
  @IsEnum(tools_status)
  status?: tools_status;
}