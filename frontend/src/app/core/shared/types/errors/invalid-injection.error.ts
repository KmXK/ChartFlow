import { Controller } from '@core/project/controllers/base/controller';
import { Class } from '../class';

export class InvalidInjectionError<
    TController extends Controller
> extends Error {
    constructor(type: Class<TController>) {
        super(`Invalid injection: required type not found (${type.name})`);
    }
}
