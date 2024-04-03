export default interface Note {
    _id?: string;
    title: string;
    content: string;
    status: string;
    author: string;
    color?: string;
    created_at?: Date;
    updated_at?: Date;
    edit: boolean;
};