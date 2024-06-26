import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthograpgyDto, ProsConsDiscusserDto } from './dtos';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(
    @Body() orthographyDto: OrthograpgyDto,
  ) {

    return this.gptService.orthographyCheck(orthographyDto)

  }

  @Post('pros-cons-discusser')
  prosConsDiscuser(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
  ) {
      return this.gptService.pronsConsDiscusser(prosConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDiscuserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
      const stream = await this.gptService.pronsConsDiscusserStream(prosConsDiscusserDto);

      res.setHeader('Content-Type', 'application/json');
      res.status( HttpStatus.OK );

      for await( const chunk of stream ) {
        const piece = chunk.choices[0].delta.content || '';
        // console.log(piece);
        res.write(piece);
      }

      res.end();
  }

}
