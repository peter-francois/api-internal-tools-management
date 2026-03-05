import { Test, TestingModule } from "@nestjs/testing";
import { ToolsController } from "./tools.controller.js";
import { ToolsService } from "./tools.service.js";


describe("ToolsController", () => {
  let controller: ToolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToolsController],
      providers: [ToolsService],
    }).compile();

    controller = module.get<ToolsController>(ToolsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
