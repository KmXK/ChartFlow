import { BehaviorSubject, Subject } from 'rxjs';

export enum FigureSettingsType {
    Text,
    Number,
    Boolean,
    List
}

export type FigureSettings = {
    name: string;
    type: FigureSettingsType;
} & (
    | {
          type: FigureSettingsType.Text;
          text: Subject<string>;
      }
    | {
          type: FigureSettingsType.List;
          items: string;
          selected: Subject<string>;
      }
    | {
          type: FigureSettingsType.Number;
          min: number;
          max: number;
          step: number;
          value: Subject<number>;
      }
    | {
          type: FigureSettingsType.Boolean;
          value: Subject<boolean>;
      }
);

export function makeSubject<T>(
    value: T,
    change: (value: T) => void
): Subject<T> {
    const subject = new BehaviorSubject<T>(value);
    subject.subscribe(value => {
        console.log('value changed', value);
        change(value);
    });
    return subject;
}
