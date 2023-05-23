import Index from '../index';

it('renders index correctly', () => {
  expect(JSON.stringify(Index)).toMatchSnapshot();
});
