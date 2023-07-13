import { App } from "./app";
import { LoggerService } from "./services/logger";

async function bootstrap() {
    const app = new App(new LoggerService());
    await app.init();
}

bootstrap();