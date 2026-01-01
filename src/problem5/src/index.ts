import express from 'express'
import { connectDatabase } from './mongo/connect-database';

import routes from './routes/index';
const app = express()
const port = process.env.PORT || 3000;


app.use(express.json());


connectDatabase();

app.use("/api", routes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
export default app;