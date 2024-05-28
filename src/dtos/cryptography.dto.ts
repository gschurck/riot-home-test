import {IsNotEmpty, IsObject, IsString} from "class-validator";

export class VerifySignatureDto {
  @IsString()
  @IsNotEmpty()
  signature: string;

  @IsObject()
  data: object;
}
