import { render, screen } from '@testing-library/react';
import App from './App';

test('renders convert button', () => {  
  render(<App />);
  const convertButton = screen.getByText(/convert/i);
  expect(convertButton).toBeInTheDocument();
} );