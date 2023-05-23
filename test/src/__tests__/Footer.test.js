import React from 'react';
import {
  cleanup,
  render,
} from '@testing-library/react';
import Footer from '../Footer';

afterEach(cleanup);

it('renders Footer correctly', () => {
  const { container } = render(
    <Footer />,
  );

  expect(container).toMatchSnapshot();
});
