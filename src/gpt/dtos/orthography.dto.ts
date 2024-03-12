import { IsInt, IsOptional, IsString } from "class-validator";


export class OrthograpgyDto {

    @IsString()
    readonly prompt: string;

    @IsInt()
    @IsOptional()
    readonly maxTokens?: number;

}