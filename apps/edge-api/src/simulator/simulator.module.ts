import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulatorService } from './simulator.service';
import { SimulatorController } from './simulator.controller';
import { SimulatorLog } from './simulator-log.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SimulatorLog])],
    controllers: [SimulatorController],
    providers: [SimulatorService],
})
export class SimulatorModule { }
