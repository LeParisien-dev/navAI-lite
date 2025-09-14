import { VisionService } from "./vision.service";
export declare class VisionController {
    private readonly visionService;
    constructor(visionService: VisionService);
    getVision(): any;
}
