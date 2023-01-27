import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

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

describe('Check and validate page navigation', () => {
  test('', async () => {
    render(
        <App />
    );

    expect(
        screen.getByText('Or continue with'),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText('Sign up here'))

    expect(
        screen.getByText('Register'),
    ).toBeInTheDocument();
  });
});

// describe('Check and validate page navigation with valid user', () => {
//   test('', async () => {
//     render(
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//     );
//
//     expect(
//         screen.getByText('Logged in'),
//     ).toBeInTheDocument();
//   });
// });
