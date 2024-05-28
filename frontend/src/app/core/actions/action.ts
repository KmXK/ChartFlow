import { BehaviorSubject, Observable } from 'rxjs';

export interface Action {
    name: string;

    init(): void;
    execute(): void;

    canExecute$: Observable<boolean>;
}

export abstract class ActionBase implements Action {
    public abstract readonly name: string;

    protected readonly canExecuteSubject = new BehaviorSubject<boolean>(false);

    public abstract execute(): void;
    public init(): void {}

    public readonly canExecute$ = this.canExecuteSubject.asObservable();
}
