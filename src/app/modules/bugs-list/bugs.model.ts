export interface Bugs {
    title: string;
    priority: number;
    reporter: string;
    createdAt: Date;
    status: string;
    description: string;
    id: string;
    comments: Comment[];
};

export interface Comment {
    reporter: string;
    description: string;
}

export interface SortBy {
    value: string;
    order: string;
};

export const enum sortType {
    desc = 'desc',
    default = 'default',
    asc = 'asc'
};

