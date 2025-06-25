import { createRequestHandler } from '@remix-run/express';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';

const app = express();

app.use(compression());
app.use(morgan('tiny'));

app.all(
  '*',
  createRequestHandler({
    getLoadContext() {
      return {};
    },
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
