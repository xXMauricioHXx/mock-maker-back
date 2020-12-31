import { IsInt, IsUrl, IsEnum, IsNotEmpty } from 'class-validator';

export class EnvValidator {
  knexConfig: any;

  @IsInt()
  @IsNotEmpty()
  httpPort: number;

  @IsNotEmpty()
  httpBodyLimit: string;

  constructor(props: any) {
    Object.assign(this, props);
  }
}
