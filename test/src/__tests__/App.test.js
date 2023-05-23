import React from 'react';
import {
  cleanup,
  render,
} from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

it('renders App correctly', () => {
  const { container } = render(
    <App />,
  );

  expect(container).toMatchSnapshot();
});
