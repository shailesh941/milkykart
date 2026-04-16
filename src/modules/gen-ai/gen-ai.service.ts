import { Injectable } from '@nestjs/common';
import { CreateGenAiDto } from './dto/create-gen-ai.dto';
import { UpdateGenAiDto } from './dto/update-gen-ai.dto';
import axios from 'axios';
import { Response } from 'express';
import { ProductsService } from '../products/products.service';

@Injectable()
export class GenAiService {
  constructor(
    private productService: ProductsService
  ){

  }
  create(createGenAiDto: CreateGenAiDto) {
    return 'This action adds a new genAi';
  }

  findAll() {
    return `This action returns all genAi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genAi`;
  }

  update(id: number, updateGenAiDto: UpdateGenAiDto) {
    return `This action updates a #${id} genAi`;
  }

  remove(id: number) {
    return `This action removes a #${id} genAi`;
  }

  async chat(prompt: string){
    const response = await axios.post(
      'http://localhost:11434/api/generate',
      {
        model: 'jarvis',
        prompt,
        stream: false, // 👈 IMPORTANT without data stream
      }
    );
    return response.data.response;
  }

  
  async chatStream(prompt: string, res: Response) {
     // ✅ 🔥 SET HEADERS HERE (VERY IMPORTANT)
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    let promptText = prompt
    if (prompt.toLowerCase().includes('all products')) {
      const products = await this.productService.findAll();
      promptText = `
        You are an assistant.
        Show these products nicely:

        ${JSON.stringify(products)}
        `;
    }
    
    const response = await axios({
      method: 'post',
      url: 'http://localhost:11434/api/generate',
      data: {
        model: 'jarvis',
        prompt:promptText,
        stream: true,
      },
      responseType: 'stream', // ✅ important
    });

    response.data.on('data', (chunk: Buffer) => {
      const lines = chunk.toString().split('\n');

      for (const line of lines) {
        if (!line) continue;

        try {
          const parsed = JSON.parse(line);

          // 👇 Ollama sends partial tokens here
          if (parsed.response) {
            res.write(parsed.response);
          }

          // 👇 End of stream
          if (parsed.done) {
            res.end();
          }

        } catch (err) {
          console.error('Parse error:', err);
        }
      }
    });

    response.data.on('end', () => {
      res.end();
    });
  }

   // 🔥 Main chat function
  async chatWithTools(prompt: string, res: Response) {

    // ✅ streaming headers
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const tools = [
      {
        type: 'function',
        function: {
          name: 'get_temperature',
          description: 'Get the current temperature for a city',
          parameters: {
            type: 'object',
            required: ['city'],
            properties: {
              city: { type: 'string' },
            },
          },
        },
      },
    ];

    let messages: any[] = [
      { role: 'system', content: 'You are Iron Man assistant for an eCommerce platform. You help users find products and answer questions.' },
      { role: 'user', content: prompt }
    ];

    // 🔥 STEP 3: Final streaming response
    const finalResponse = await axios({
      method: 'post',
      url: 'http://localhost:11434/api/chat',
      data: {
        model: 'qwen3.5',
        messages,
        tools,
        stream: true,
      },
      responseType: 'stream',
    });

    let buffer = '';

    console.log(finalResponse)

    finalResponse.data.on('data', (chunk: Buffer) => {
      buffer += chunk.toString();

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const parsed = JSON.parse(line);

          if (parsed.message?.content) {
            res.write(parsed.message.content); // ✅ stream to Angular
          }

          if (parsed.done) {
            res.end();
          }

        } catch (err) {
          console.error('Parse error:', err);
        }
      }
    });

    finalResponse.data.on('end', () => {
      res.end();
    });
  }

  getTemperature(city: string): string {
    const temperatures: Record<string, string> = {
      'New York': '22°C',
      'London': '15°C',
      'Tokyo': '18°C',
    }
    return temperatures[city] ?? 'Unknown'
  }


}
