import { FileUpload } from '../../FileUpload';
export declare class UserInputType {
    name: string;
    email: string;
    phone: string;
    password: string;
    photo: Promise<FileUpload>;
}
