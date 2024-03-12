import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase } from './use-cases';
import { OrthograpgyDto, ProsConsDiscusserDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    // Solo va a llamar casos de uso

    async orthographyCheck(orthographyDto: OrthograpgyDto) {
        return await orthographyCheckUseCase( this.openai, {
            prompt: orthographyDto.prompt
        });
    }

    async pronsConsDiscusser( { prompt }: ProsConsDiscusserDto ) {
        return await prosConsDiscusserUseCase(this.openai, { prompt });
    }

    async pronsConsDiscusserStream( { prompt }: ProsConsDiscusserDto ) {
        return await prosConsDiscusserStreamUseCase(this.openai, { prompt });
    }

}
