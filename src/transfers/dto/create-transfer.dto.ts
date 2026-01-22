import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from "class-validator";


export class CreateTransferDto {

    @IsUUID()
    @IsNotEmpty()
    toAccount: string;
      
    @IsPositive()
    @IsNotEmpty()
    @IsNumber({ 
        maxDecimalPlaces: 2 
    })
    amount: number;

}
