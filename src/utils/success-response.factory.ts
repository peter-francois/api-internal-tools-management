import { ApiProperty } from "@nestjs/swagger";

export function SuccessResponseFactory<T, M>(DataClass: new () => T, MetaClass: new () => M) {
  class SuccessResponseClass {
    @ApiProperty({ type: () => DataClass, isArray: true })
    data: T[];

    @ApiProperty({ type: () => MetaClass })
    meta: M;
  }
  return SuccessResponseClass;
}