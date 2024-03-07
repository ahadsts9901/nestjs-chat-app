import { IsNotEmpty, IsString } from "class-validator"

export class CreateChatDto {

    @IsString()
    @IsNotEmpty()
    message: string

    @IsString()
    @IsNotEmpty()
    userId:string

}