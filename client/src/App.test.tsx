import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';

import App from './App';

describe('', () => {
  test('Example render test', () => {
    render(<App />);
    expect(
      screen.getByText(/App/),
    ).toBeInTheDocument();
  });
});
