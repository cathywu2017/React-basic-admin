import React from 'react';
import {
  cleanup,
  render,
  waitForElement,
  fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Main from '../Main';

afterEach(cleanup);

it('renders table data correctly', async () => {
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

  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      ret: fakeUser,
      pagination,
    }),
  }));

  const { getByText, container } = render(
    <Main />,
  );

  const totalLen = await waitForElement(() => pagination.total);

  expect(totalLen).toBe(1);

  act(() => {
    fireEvent.click(getByText('新增'));
    fireEvent.click(getByText('編輯'));
    fireEvent.click(getByText('刪除'));
    fireEvent.click(getByText('搜尋'));
  });

  act(() => {
    fireEvent.click(document.querySelector('.modals'));
  });

  expect(container).toMatchSnapshot();

  global.fetch.mockRestore();
});

it('changePage test', async () => {
  const fakeUser = [
    {
      id: 1,
      username: 'user1',
      created_at: '2019/11/20 8:53:26',
      enable: 1,
      locked: 1,
    },
    {
      id: 2,
      username: 'user2',
      created_at: '2019/11/20 8:53:26',
      enable: 1,
      locked: 0,
    },
  ];

  const pagination = {
    first_result: 0,
    max_results: 1,
    total: 2,
  };

  const updata = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      ret: fakeUser,
      pagination,
    }),
  }));

  const { getAllByText } = render(<Main />);

  const totalLen = await waitForElement(() => pagination.total);

  expect(totalLen).toBe(2);

  await act(async () => {
    fireEvent.click(getAllByText('»')[0]);
  });

  expect(updata).toHaveBeenLastCalledWith('/api/users?first_result=1', { method: 'GET' });

  global.fetch.mockRestore();
});

it('afer search changePage test', async () => {
  const fakeUser = [
    {
      id: 1,
      username: 'user1',
      created_at: '2019/11/20 8:53:26',
      enable: 1,
      locked: 1,
    },
    {
      id: 2,
      username: 'user2',
      created_at: '2019/11/20 8:53:26',
      enable: 1,
      locked: 0,
    },
  ];

  const pagination = {
    first_result: 0,
    max_results: 1,
    total: 2,
  };

  const updata = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      ret: fakeUser,
      pagination,
    }),
  }));

  const { getAllByText, getByText, getByPlaceholderText } = render(<Main />);

  expect(await waitForElement(() => pagination.total)).toBe(2);

  fireEvent.click(getByText('搜尋'));

  expect(document.querySelector('.modal')).toBeTruthy();

  fireEvent.change(getByPlaceholderText('請輸入帳號'), { target: { value: 'user1' } });

  fireEvent.click(getAllByText('搜尋')[2]);

  await act(async () => {
    expect(updata).toHaveBeenLastCalledWith('/api/users?first_result=0&username=user1', { method: 'GET' });
  });

  await act(async () => {
    fireEvent.click(getAllByText('»')[0]);
  });

  global.fetch.mockRestore();
});

it('export CSV', async () => {
  const fakeUser = [
    {
      id: 1,
      username: 'user1',
      created_at: '2019/11/20 8:53:26',
      enable: 1,
      locked: 1,
    },
    {
      id: 2,
      username: 'user2',
      created_at: '2019/11/20 8:53:26',
      enable: 0,
      locked: 0,
    },
  ];

  const pagination = {
    first_result: 0,
    max_results: 1,
    total: 2,
  };

  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      ret: fakeUser,
      pagination,
    }),
  }));

  const { getByText } = render(<Main />);

  await waitForElement(() => pagination.total);

  global.URL.createObjectURL = jest.fn();

  fireEvent.click(getByText('匯出'));

  global.fetch.mockRestore();
});
