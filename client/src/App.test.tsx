import '@testing-library/jest-dom';
import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from './App';
import UserProfile from "./components/UserProfile";
import ScreenContent from "./Routes/ScreenContent";
import {BrowserRouter} from "react-router-dom";
import SearchResultsBox from "./components/SearchBar/SearchResultsBox/index.";
import Alert from "./components/UserNotifications/Alert";
import ConnectionInvite from "./components/UserNotifications/ConnectionInvite";
import Dashboard from "./components/UserNotifications/Dashboard";
import NavSettings from "./components/UserNotifications/NavSettings";
import getAllUsers from "./http/getAllUsers";
import getCurrentUserProfile from "./http/getCurrentUserProfile";
import getUserProfile from "./http/getUserProfile";
import saveUserToDB from "./http/saveUserToDB";
import updateUserProfile from "./http/updateUserProfile";

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
    await act(async () => {
      await render(
        <App/>
      );
    });

    expect(
        screen.getByText('Forgot Password?'),
    ).toBeInTheDocument();

    await act(async () => {
      let signupButton = await act(() => {
        return screen.getByText('Sign up here');
      });
      await userEvent.click(signupButton);
    });

    expect(
        await screen.getByText('Register'),
    ).toBeInTheDocument();


    /*
     This should be in a separate test, but the renderer for testing stays persistent between tests. Making it
     impossible to create a separate test that successively passes on its own and during an execution of all tests.
     Ideally the starting page should be settable between each test.
    */
    await act(async () => {
      let forgotPassButton = await act(() => {
        return screen.getByText('Login here');
      });
      await userEvent.click(forgotPassButton);
    });

    await act(async () => {
      let forgotPassButton = await act(() => {
        return screen.getByText('Forgot Password?');
      });
      await userEvent.click(forgotPassButton);
    });

    expect(
      screen.getByText('Forgot Password'),
    ).toBeInTheDocument();

    await act(async () => {
      let emailField = await act(() => {
        return screen.getByPlaceholderText('Email');
      });
      await userEvent.type(emailField, 'test@hotmail.com');
    });

    await act(async () => {
      let resetButton = await act(() => {
        return screen.getByText('Reset');
      });
      await userEvent.click(resetButton);
    });

    // This should be in a separate test
    await act(async () => {
      let signupButton = await act(() => {
        return screen.getByText('Sign up here');
      });
      await userEvent.click(signupButton);
    });

    await act(async () => {
      let firstNameField = await act(() => {
        return screen.getByPlaceholderText('First Name');
      });
      let lastNameField = await act(() => {
        return screen.getByPlaceholderText('Last Name');
      });
      let emailField = await act(() => {
        return screen.getByPlaceholderText('Email');
      });
      let passwordField = await act(() => {
        return screen.getByPlaceholderText('Password');
      });
      await userEvent.type(firstNameField, 'Test');
      await userEvent.type(lastNameField, 'Man');
      await userEvent.type(emailField, 'test@hotmail.com');
      await userEvent.type(passwordField, 'Test123@');
    });

    await act(async () => {
      let registerButton = await act(() => {
        return screen.getByText('Register');
      });
      await userEvent.click(registerButton);
    });

    // This should be in a separate test
    await act(async () => {
      let loginButton = await act(() => {
        return screen.getByText('Login here');
      });
      await userEvent.click(loginButton);
    });

    await act(async () => {
      let emailField = await act(() => {
        return screen.getByPlaceholderText('Email');
      });
      let passwordField = await act(() => {
        return screen.getByPlaceholderText('Password');
      });
      await userEvent.type(emailField, 'Test@hotmail.com');
      await userEvent.type(passwordField, 'Test123@');
    });

    await act(async () => {
      let loginButton = await act(() => {
        return screen.getAllByText('Login')[1];
      });
      await userEvent.click(loginButton);
    });
  });
});

describe('User profile', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ users: "test" }),
      })
    );
  });

  test('Check and validate page navigation', async () => {
    await act(async () => {
      await render(
        <UserProfile />
      );
    });

    expect(
      await screen.getByText('About'),
    ).toBeInTheDocument();
  });
});

describe('ScreenContent', () => {
  test('Render ScreenContent', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <ScreenContent />
          </BrowserRouter>
        </>
      );
    });
  });
});

describe('SearchResultsBox', () => {
  test('Render SearchResultsBox', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <SearchResultsBox />
          </BrowserRouter>
        </>
      );
    });
  });
});

describe('UserNotifications', () => {
  test('Render UserNotificationsAlert', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <Alert  description="test" time={100}  type="some type" />
          </BrowserRouter>
        </>
      );
    });
  });

  test('Render UserNotificationsConnectionInvite', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <ConnectionInvite connection_message="hello" connections={2} job_title="professor" name="Bob"/>
          </BrowserRouter>
        </>
      );
    });
  });

  test('Render UserNotificationsDashboard', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <Dashboard posts_views="2" search_appearances="professor" views_today="2"/>
          </BrowserRouter>
        </>
      );
    });
  });

  test('Render UserNotificationsNavSettings', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <NavSettings />
          </BrowserRouter>
        </>
      );
    });
  });
});

describe('httpRequests', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ users: "test" }),
      })
    );
  });

  test('Request allUsers', async () => {
    const res = await getAllUsers();

    expect(res.users).toBe("test");
  });

  test('Request currentUserprofile', async () => {
    const res = await getCurrentUserProfile();

    expect(res).toBe(undefined);
  });

  test('Request saveUserToDB', async () => {
    const res = await saveUserToDB("test", "test", "test", "test");

    expect(res.users).toBe("test");
  });

  test('Request updateUserProfile', async () => {
    const res = await updateUserProfile({
        name: "test",
        title: "test",
        location: "test",
        email: "test",
        phone: "test",
        website: "test",
        connections: 1,
        picture: "test",
        backdrop: "test",
        summary: "test",
        projects: [],
        skills: [],
        experience: [],
        education: [],
        languages: [],
        awards: [],
        courses: [],
    });

    expect(res).toBe(undefined);
  });

  test('Request userProfile', async () => {
    jest.unmock('./http/getUserProfile');
    const res = await getUserProfile("Meme");

    expect(res.data).toBe(undefined);
  });
});
