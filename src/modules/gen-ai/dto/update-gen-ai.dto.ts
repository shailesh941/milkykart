import { PartialType } from '@nestjs/mapped-types';
import { CreateGenAiDto } from './create-gen-ai.dto';

export class UpdateGenAiDto extends PartialType(CreateGenAiDto) {}
