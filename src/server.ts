import { port, environment } from './config';
import app from './app';

app.listen(port, () => { console.log(`server running in ${environment} on port : ${port}`) });