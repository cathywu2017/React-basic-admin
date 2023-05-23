import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import AddEditModal from '../AddEditModal';

afterEach(cleanup);

it('renders AddEditModal correctly -- add block', () => {
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

  const goPage = jest.fn();
  const onClose = jest.fn();
  const handleInputValue = jest.fn();
  const handleEnable = jest.fn();
  const handleLocked = jest.fn();

  const { getByText, getByPlaceholderText } = render(
    <AddEditModal
      currentPage={1}
      perPage={1}
      total={1}
      id={1}
      enable={0}
      locked={0}
      inputValue="user1"
      openModal
      goPage={goPage}
      onClose={onClose}
      handleInputValue={handleInputValue}
      handleEnable={handleEnable}
      handleLocked={handleLocked}
      isNew
    />,
  );

  act(() => {
    fireEvent.change(getByPlaceholderText('請輸入帳號'), { target: { value: 'a' } });
    fireEvent.click(getByPlaceholderText('enable1'));
    fireEvent.click(getByPlaceholderText('locked1'));
    fireEvent.click(getByText('送出'));
  });

  expect(updata).toHaveBeenCalled();

  global.fetch.mockRestore();
});

it('renders AddEditModal correctly -- edit block', () => {
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

  const goPage = jest.fn();
  const onClose = jest.fn();
  const handleInputValue = jest.fn();
  const handleEnable = jest.fn();
  const handleLocked = jest.fn();

  const { getByText } = render(
    <AddEditModal
      currentPage={1}
      perPage={1}
      total={1}
      id={1}
      enable={0}
      locked={0}
      inputValue="user1"
      openModal
      goPage={goPage}
      onClose={onClose}
      handleInputValue={handleInputValue}
      handleEnable={handleEnable}
      handleLocked={handleLocked}
      isNew={false}
    />,
  );

  act(() => {
    fireEvent.click(getByText('送出'));
  });

  expect(updata).toHaveBeenCalled();

  global.fetch.mockRestore();
});
