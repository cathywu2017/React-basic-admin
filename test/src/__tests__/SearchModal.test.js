import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SearchModal from '../SearchModal';

afterEach(cleanup);

it('renders SearchModal correctly', () => {
  const goPage = jest.fn();
  const onClose = jest.fn();

  const { getByPlaceholderText, getAllByText } = render(
    <SearchModal
      openSearch
      goPage={goPage}
      onClose={onClose}
    />,
  );

  act(() => {
    fireEvent.change(getByPlaceholderText('請輸入帳號'), { target: { value: 'user1' } });
    fireEvent.change(getByPlaceholderText('開始日期'), { target: { value: '2019-12-24' } });
    fireEvent.change(getByPlaceholderText('結束日期'), { target: { value: '2019-12-26' } });
    fireEvent.click(getByPlaceholderText('enable1'));
    fireEvent.click(getByPlaceholderText('locked1'));
  });

  act(() => {
    fireEvent.click(getAllByText('搜尋')[1]);
  });
});
