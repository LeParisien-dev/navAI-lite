import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { RouteHistory } from './route-history.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RouteHistory])],
    controllers: [RouteController],
    providers: [RouteService],
})
export class RouteModule { }
