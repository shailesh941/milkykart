import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { GenAiService } from './gen-ai.service';
import { CreateGenAiDto } from './dto/create-gen-ai.dto';
import { UpdateGenAiDto } from './dto/update-gen-ai.dto';
import type { Response } from 'express';

@Controller('genai')
export class GenAiController {
  constructor(private readonly genAiService: GenAiService) {}

  @Post()
  create(@Body() createGenAiDto: CreateGenAiDto) {
    return this.genAiService.create(createGenAiDto);
  }

  @Post('chat')
  chat(@Body() createOpenaiDto: CreateGenAiDto) {
    return this.genAiService.chat(createOpenaiDto.prompt);
  }
  @Post('stream')
  async chatStream(
    @Body('prompt') prompt: string,
    @Res() res: Response,
  ) {
    return this.genAiService.chatWithTools(prompt, res);
  }

  @Get()
  findAll() {
    return this.genAiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genAiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenAiDto: UpdateGenAiDto) {
    return this.genAiService.update(+id, updateGenAiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genAiService.remove(+id);
  }
}
