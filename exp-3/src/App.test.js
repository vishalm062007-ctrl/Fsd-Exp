import { render, screen } from '@testing-library/react';
import App from './App';

test('renders student registration portal header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Student Registration Portal/i);
  expect(linkElement).toBeInTheDocument();
});
