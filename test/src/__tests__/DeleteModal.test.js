import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import DeleteModal from '../DeleteModal';

afterEach(cleanup);

it('renders DeleteModal correctly -- not change', () => {
  const updata = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => {},
  }));

  const onClose = jest.fn();
  const goPage = jest.fn();

  const { getByText } = render(
    <DeleteModal
      currentPage={1}
      perPage={1}
      total={1}
      id={1}
      openAlert
      open
      onClose={onClose}
      goPage={goPage}
    />,
  );

  act(() => {
    fireEvent.click(getByText('確認'));
  });

  expect(updata).toHaveBeenCalled();

  global.fetch.mockRestore();
});

it('renders DeleteModal correctly2 -- change page', () => {
  const updata = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => {},
  }));

  const onClose = jest.fn();
  const goPage = jest.fn();

  const { getByText } = render(
    <DeleteModal
      currentPage={2}
      perPage={1}
      total={3}
      id={1}
      openAlert
      open
      onClose={onClose}
      goPage={goPage}
    />,
  );

  act(() => {
    fireEvent.click(getByText('確認'));
  });

  expect(updata).toHaveBeenCalled();

  global.fetch.mockRestore();
});
