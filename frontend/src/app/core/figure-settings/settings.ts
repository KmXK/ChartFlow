import {
    FigureSettings,
    FigureSettingsType,
    makeSubject
} from './figure-settings';

export function strokeWidthSetting(
    strokeWidth: number,
    change: (value: number) => void
): FigureSettings {
    return {
        name: 'Stroke Width',
        type: FigureSettingsType.Number,
        min: 0,
        max: 100,
        step: 1,
        value: makeSubject(strokeWidth, change)
    };
}

export function fontSizeSetting(
    fontSize: number,
    change: (value: number) => void
): FigureSettings {
    return {
        name: 'Font Size (pt)',
        type: FigureSettingsType.Number,
        min: 0,
        max: 100,
        step: 1,
        value: makeSubject(fontSize, change)
    };
}
