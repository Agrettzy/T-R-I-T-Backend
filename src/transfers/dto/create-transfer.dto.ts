import { IsNotEmpty, IsNumber, IsPositive, IsString, Length } from "class-validator";


export class CreateTransferDto {

    @IsString()
    @IsNotEmpty()
    @Length(10, 10, { 
        message: 'The account key must be exactly 10 digits' 
    })
    toAccount: string;
      
    @IsPositive()
    @IsNotEmpty()
    @IsNumber({ 
        maxDecimalPlaces: 2 
    })
    amount: number;

}
