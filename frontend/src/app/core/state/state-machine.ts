import {
    IntEnumObject,
    IntEnumValue,
    getIntEnumValues,
    isIntEnumValue
} from './types/int-enum';

type TransitionConfig<TEnum extends IntEnumObject<TEnum>> = {
    [value in IntEnumValue<TEnum>]: Array<IntEnumValue<TEnum>>;
};

export interface StateMachineConfig<TEnum extends IntEnumObject<TEnum>> {
    initState?: IntEnumValue<TEnum>;
    validTransitions?: TransitionConfig<TEnum>;
    denyTransitions?: Partial<TransitionConfig<TEnum>>;
}

export class StateMachine<TEnum extends IntEnumObject<TEnum>> {
    private readonly enum: TEnum;
    // TODO: Change to map of sets
    private readonly validTransitions: TransitionConfig<TEnum>;

    private state: IntEnumValue<TEnum>;

    constructor(enumObject: TEnum, config?: StateMachineConfig<TEnum>) {
        this.enum = enumObject;

        this.state = config?.initState ?? getIntEnumValues(this.enum)[0];
        if (config?.validTransitions === undefined) {
            const values = getIntEnumValues(enumObject);
            const transitions = {} as TransitionConfig<TEnum>;
            for (const key of values) {
                transitions[key] = values.filter(x => x !== key);
            }

            this.validTransitions = transitions;

            console.log('new transition map', transitions);
        } else {
            this.validTransitions = config.validTransitions;
        }

        if (config?.denyTransitions !== undefined) {
            for (const [key, values] of Object.entries(
                config.denyTransitions
            )) {
                if (!isIntEnumValue(enumObject, key)) continue;

                this.validTransitions[key] = this.validTransitions[key].filter(
                    x => !(values as IntEnumValue<TEnum>[]).includes(x)
                );
            }
        }

        console.log(
            'State machine is initialized: state = ' + this.state,
            this.validTransitions
        );
    }

    public transit(to: IntEnumValue<TEnum>): void {
        const transitionLog = `from=${this.state} to=${to}`;
        if (
            to != this.state &&
            !this.validTransitions[this.state].includes(to)
        ) {
            console.warn(`Invalid transition: ${transitionLog}`);
        } else {
            this.state = to;
            console.log(transitionLog);
        }
    }

    public in(state: IntEnumValue<TEnum>): boolean {
        return this.state === state;
    }
}
