import { cleanup } from '@testing-library/react';
import Fetch from '../Fetch';

afterEach(cleanup);

it('renders Fetch GET - searchData not undefined', async () => {
  const method = 'GET';

  const searchData = {
    username: 'user1',
  };

  const fakeUser = [
    {
      id: 1,
      username: 'user1',
      created_at: '2019/11/20 8:53:26',
      enable: 0,
      locked: 0,
    },
  ];

  const pagination = {
    first_result: 0,
    max_results: 20,
    total: 1,
  };

  const updata = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      ret: fakeUser,
      pagination,
    }),
  }));

  const getData = await Fetch(method, 0, searchData);

  expect(updata).toHaveBeenLastCalledWith('/api/users?first_result=0&username=user1', { method: 'GET' });

  expect(getData.ret[0]).toBe(fakeUser[0]);

  global.fetch.mockRestore();
});

it('renders Fetch GET - searchData is undefined', async () => {
  const method = 'GET';

  const updata = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(),
  }));

  const getData = await Fetch(method, 0);

  expect(updata).toHaveBeenLastCalledWith('/api/users?first_result=0', { method: 'GET' });

  expect(getData).toBe();

  global.fetch.mockRestore();
});

it('renders Fetch GET - searchData is empty string', async () => {
  const method = 'GET';

  const searchData = {
    username: '',
  };

  const updata = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      result: 'ok',
    }),
  }));

  const getData = await Fetch(method, 0, searchData);

  expect(updata).toHaveBeenLastCalledWith('/api/users?first_result=0', { method: 'GET' });

  expect(getData.result).toBe('ok');

  global.fetch.mockRestore();
});

it('renders Fetch POST', async () => {
  const body = {
    username: 'user1',
    enable: 1,
    locked: 1,
  };

  const params = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  };

  const updata = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      result: 'ok',
    }),
  }));

  const getData = await Fetch(params.method, 0, body);

  expect(updata).toHaveBeenLastCalledWith('/api/user', params);

  expect(getData.result).toBe('ok');

  global.fetch.mockRestore();
});

it('renders Fetch PUT', async () => {
  const params = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  const fakeUser = [
    {
      id: 1,
      username: 'user1',
      created_at: '2019/11/20 8:53:26',
      enable: 0,
      locked: 0,
    },
  ];

  const updata = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      result: 'ok',
      ret: fakeUser,
    }),
  }));

  const getData = await Fetch(params.method, fakeUser[0].id);

  expect(updata).toHaveBeenLastCalledWith('/api/user/1', params);

  expect(getData.ret[0]).toEqual(fakeUser[0]);

  global.fetch.mockRestore();
});

it('renders Fetch DELETE', async () => {
  const params = {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  const updata = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({}),
  }));

  const getData = await Fetch(params.method);

  expect(updata).toHaveBeenLastCalledWith('/api/user/0', params);

  expect(getData).toEqual({});

  global.fetch.mockRestore();
});
