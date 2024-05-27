export interface Comment {
    id: string;
    text: string;
    user: {
        id: string;
        login: string;
    };
    rating: number;
    modifiedTime: Date;
}
