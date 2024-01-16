import { render, fireEvent } from '@testing-library/react';
import ThemeProvider from './ThemeContext';
import ThemeToggleButton from './ThemeToggleButton';

test('renders theme toggle button', () => {
  render(
    <ThemeProvider>
      <ThemeToggleButton />
    </ThemeProvider>
  );
  const toggleButton = document.getElementById('toggleButton');
  expect(toggleButton).toBeInTheDocument();
}   );