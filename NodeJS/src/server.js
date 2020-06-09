/* eslint-disable no-console */
import dotenv from 'dotenv';

import app from './app';

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
