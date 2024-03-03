// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type ConstructorOf<T extends object, Args extends any[]> = {
//     prototype: T;
//     new (...args: Args): T;
// };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
// export function Controller<T extends ConstructorOf<ControllerBase, any[]>>(
//     constructor: T
// ) {
//     return class extends constructor {
//         constructor(
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             ...args: any[]
//         ) {
//             super(args[0] as Injector);
//         }
//     };
// }
