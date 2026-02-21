import {IsEnum, IsNotEmpty, IsNumber, IsString, validateSync} from "class-validator";
import {plainToInstance} from "class-transformer";

enum Environment {
    Local = 'localhost',
    Development = 'dev',
    Production = 'prod'
}

export class EnvironmentVariables {
    @IsEnum(Environment)
    @IsNotEmpty()
    ENVIRONMENT: Environment;

    @IsString()
    @IsNotEmpty()
    DB_HOST: string;

    @IsNumber()
    @IsNotEmpty()
    DB_PORT: number;

    @IsString()
    @IsNotEmpty()
    DB_USERNAME: string;

    @IsString()
    @IsNotEmpty()
    DB_PASSWORD: string;

    @IsString()
    @IsNotEmpty()
    DB_NAME: string;
}

export function validate(config: Record<string, unknown>) {
    const validateConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true
    });

    const errors = validateSync(validateConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        const message = errors.map(err => {
            return err.constraints ? JSON.stringify(err.constraints, null, 2) : '';
        }).join('\n');
        throw new Error(message);
    }

    return validateConfig;
}