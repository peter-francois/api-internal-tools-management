import { ApiProperty } from "@nestjs/swagger";

export function SuccessResponseFactory<T, M>(
  DataClass: new () => T,
  MetaClass?: new () => M
) {
  class SuccessResponseClass {
    @ApiProperty({ type: () => DataClass, isArray: Array.isArray(DataClass) })
    data: T;

    @ApiProperty({ type: () => MetaClass ?? Object, required: false })
    meta?: M;
  }

  Object.defineProperty(SuccessResponseClass, 'name', {
    value: `${DataClass.name}SuccessResponse`,
  });

  return SuccessResponseClass;
}