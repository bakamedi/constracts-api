import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        console.log(req['id']);
        const user = req['id'];

        if (!user) {
            throw new InternalServerErrorException('User not found (request)');
        }
        
        return (!data) ? user : user[data];
    }
);