export interface Extension {
    id: string;
    name: string;
    description: string;
    author: {
        id: string;
        login: string;
    };
    installed: boolean;
}
