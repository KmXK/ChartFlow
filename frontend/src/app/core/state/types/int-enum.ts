export type IntEnumKey<TEnum> = keyof TEnum & string;
export type IntEnumValue<TEnum> = TEnum[keyof TEnum];
export type IntEnumObject<TEnum> = {
    [k in keyof TEnum]: k extends string ? number : string;
};

export function getIntEnumKeys<TEnum extends IntEnumObject<TEnum>>(
    enumObject: TEnum
): IntEnumKey<TEnum>[] {
    return Object.keys(enumObject).filter(function (x): x is IntEnumKey<TEnum> {
        const num = Number(x);
        if (!Number.isNaN(num)) {
            return false;
        }

        return isIntEnumKey(enumObject, x);
    });
}

export function getIntEnumValues<TEnum extends IntEnumObject<TEnum>>(
    enumObject: TEnum
): IntEnumValue<TEnum>[] {
    return Object.values(enumObject).filter(
        function (x): x is IntEnumValue<TEnum> {
            const num = Number(x);
            if (Number.isNaN(num)) {
                return false;
            }

            return isIntEnumValue(enumObject, num);
        }
    );
}

export function isIntEnumValue<TEnum extends IntEnumObject<TEnum>>(
    enumObject: TEnum,
    value: string | number
): value is IntEnumValue<TEnum> {
    if (typeof value !== 'number' && typeof (value = +value) !== 'number') {
        return false;
    }

    return typeof value === 'number' && checkTwoWayMapping(enumObject, value);
}

export function isIntEnumKey<TEnum extends IntEnumObject<TEnum>>(
    enumObject: TEnum,
    value: string | number
): value is IntEnumKey<TEnum> {
    const enumAny = enumObject as Record<string | number, string | number>;
    return typeof value === 'string' && checkTwoWayMapping(enumObject, value);
}

function checkTwoWayMapping<TEnum extends IntEnumObject<TEnum>>(
    enumObject: TEnum,
    value: string | number
): boolean {
    const enumAny = enumObject as Record<string | number, string | number>;
    return (
        value in enumObject &&
        enumAny[value] in enumAny &&
        enumAny[enumAny[value]] in enumAny &&
        enumAny[enumAny[value]] === value
    );
}
