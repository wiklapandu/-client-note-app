export default interface Note {
    title: string;
    content: string;
    status: string;
    author: string;
    color?: string;
    created_at?: Date;
    updated_at?: Date;
    edit: boolean;
};