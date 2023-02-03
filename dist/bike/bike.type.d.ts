export declare class CommentInputType {
    id: string;
    comment: string;
}
export declare class BikesType {
    id: string;
    name: string;
    typeId: string;
    createdBy: string;
    photo: string;
    likes: null | string[];
    comments: null | CommentInputType[];
    createdAt: Date;
    updatedAt: Date;
}
