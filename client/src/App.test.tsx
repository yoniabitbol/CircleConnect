import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('Get title on login Screen test', () => {
  test('', () => {
    render(<App />);
    expect(
      screen.getByText(/CircleConnect/),
    ).toBeInTheDocument();
  });
});
