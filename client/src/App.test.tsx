import '@testing-library/jest-dom';
import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from './App';
import UserProfile from "./components/UserProfile";

jest.mock('./firebase/config', () => ({
  auth: () => 'test',
}));

jest.mock('./hooks/useAuthContext', () => ({
  __esModule: true,
  default: () => {
    return {user: null, authIsReady: true};
  },
}));

describe('App root', () => {
  test('Check and validate page navigation', async () => {
    await act(() => {
      render(
        <App/>
      );
    });

    expect(
        screen.getByText('Forgot Password?'),
    ).toBeInTheDocument();

    await act(() => {
      userEvent.click(screen.getByText('Sign up here'));
    });

    expect(
        screen.getByText('Register'),
    ).toBeInTheDocument();


    /*
     This should be in a separate test, but the renderer for testing stays persistent between tests. Making it
     impossible to create a separate test that successively passes on its own and during an execution of all tests.
     Ideally the starting page should be settable between each test.
    */
    await act(() => {
      userEvent.click(screen.getByText('Login here'));
    });

    await act(() => {
      userEvent.click(screen.getByText('Forgot Password?'));
    });

    expect(
      screen.getByText('Forgot Password'),
    ).toBeInTheDocument();

    await act(() => {
      userEvent.type(screen.getByPlaceholderText('Email'), 'test@hotmail.com');
    });

    await act(() => {
      userEvent.click(screen.getByText('Reset'));
    });

    // expect(
    //   screen.getByText('Email is not registered'),
    // ).toBeInTheDocument();

    // This should be in a separate test
    await act(() => {
      userEvent.click(screen.getByText('Sign up here'));
    });

    await act(() => {
      userEvent.type(screen.getByPlaceholderText('First Name'), 'Test');
      userEvent.type(screen.getByPlaceholderText('Last Name'), 'Man');
      userEvent.type(screen.getByPlaceholderText('Email'), 'test@hotmail.com');
      userEvent.type(screen.getByPlaceholderText('Password'), 'Test123@');
    });

    await act(() => {
      userEvent.click(screen.getByText('Register'));
    });

    // This should be in a separate test
    await act(() => {
      userEvent.click(screen.getByText('Login here'));
    });

    await act(() => {
      userEvent.type(screen.getByPlaceholderText('Email'), 'Test@hotmail.com');
      userEvent.type(screen.getByPlaceholderText('Password'), 'Test123@');
    });

    await act(() => {
      userEvent.click(screen.getAllByText('Login')[1]);
    });
  });
});

jest.mock('./utils/getUserProfile', () => ({
  __esModule: true,
  default: async () => {
    return {data: {user: {
                  name: 'test',
                  title: 'test',
                  location: 'test',
                  email: 'test',
                  phone: 'test',
                  website: 'test',
                  connections: 'test',
                  picture: 'test',
                  backdrop: 'test',
                  summary: 'test',
                  projects: 'test',
                  skills: 'test',
                  experience: 'test',
                  education: 'test',
                  languages: 'test',
                  awards: 'test',
                  courses: 'test'
    }}};
  },
}));

describe('User profile', () => {
  test('Check and validate page navigation', async () => {
    await act(() => {
      render(
        <UserProfile />
      );
    });

    expect(
      await screen.getByText('About'),
    ).toBeInTheDocument();
  });
});
