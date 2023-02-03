import { ExecutionContext } from '@nestjs/common';
declare const MySuperGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class MySuperGuard extends MySuperGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
