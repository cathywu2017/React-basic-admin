import React from 'react';
import {
  cleanup,
  render,
} from '@testing-library/react';
import Header from '../Header';

afterEach(cleanup);

it('renders Header correctly', () => {
  const { container } = render(
    <Header />,
  );

  expect(container).toMatchSnapshot();
});
