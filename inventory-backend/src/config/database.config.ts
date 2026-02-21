import { registerAs } from "@nestjs/config";

export default registerAs('database', () => {
    return {
        // Renamed 'post' to 'port' and ensured types match
        environment: process.env.ENVIRONMENT,
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5555,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'tech_inventory_db',
    };
});

// IMPORTANT
// In a production ready environment these credentials will be fetched from GitHub secrets or other providers, and locally they will be stored in .env files.