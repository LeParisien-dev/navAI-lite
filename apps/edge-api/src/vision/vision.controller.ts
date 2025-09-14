import { Controller, Get } from "@nestjs/common";
import { VisionService } from "./vision.service";

@Controller("vision")
export class VisionController {
    constructor(private readonly visionService: VisionService) { }

    @Get()
    getVision() {
        return this.visionService.getStatus();
    }
}
