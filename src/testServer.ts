import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { apiKey } from './envVariables';
import testData from './testData';

const server = setupServer(
   rest.get(`https://www.omdbapi.com/?apikey=${apiKey}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(testData));
   })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
