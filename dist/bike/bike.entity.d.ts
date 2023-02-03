export declare class CommentEntity {
    constructor();
    id: string;
    comment: string;
}
export declare class Bike {
    _id: string;
    id: string;
    name: string;
    createdBy: string;
    typeId: string;
    likes: string[] | null;
    comments: [CommentEntity];
    photo: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}
