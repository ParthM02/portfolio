import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio page header', () => {
  render(<App />);
  const nameElements = screen.getAllByText(/Parth Mehta/i);
  expect(nameElements.length).toBeGreaterThan(0);
});
