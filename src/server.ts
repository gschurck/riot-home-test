import {App} from '@/app';
import {ValidateEnv} from '@utils/validateEnv';
import {CryptographyRoute} from "@routes/cryptography.route";

ValidateEnv();

const app = new App([new CryptographyRoute()]);

app.listen();
