import { Injectable } from "@angular/core";
import { Point } from "../shared/models/point.model";

@Injectable()
export class PointMappingService {
    public clientToGlobal(p: Point, offset: Point, zoom: number): Point {
        return p.subtract(offset);
    }

    public globalToClient(p: Point, offset: Point, zoom: number): Point {
        return p.add(offset);
    }
}
