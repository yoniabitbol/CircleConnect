import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import App from './App';

jest.mock('./firebase/config', () => ({
  auth: () => 'test',
}));

jest.mock('./hooks/useAuthContext', () => ({
  __esModule: true,
  default: () => {
    return {user: null, authIsReady: true};
  },
}));

describe('Get title on login Screen test', () => {
  test('', () => {
    render(<App />);
    expect(
        screen.getByText('CircleConnect'),
    ).toBeInTheDocument();
  });
});
