import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import UserProfile from "./components/UserProfile";
import ScreenContent from "./Routes/ScreenContent";
import {BrowserRouter} from "react-router-dom";
import NavSettings from "./components/UserNotifications/NavSettings";
import getAllUsers from "./http/getAllUsers";
import getCurrentUserProfile from "./http/getCurrentUserProfile";
import getUserProfile from "./http/getUserProfile";
import saveUserToDB from "./http/saveUserToDB";
import updateUserProfile from "./http/updateUserProfile";
import UserNotifications from "./components/UserNotifications";
import SearchBar from "./components/SearchBar";
import SearchResultsBox from "./components/SearchBar/SearchResultsBox/index.";
import MobileNav from "./components/Navbar/MobileNav";
import ForgotPass from "./Routes/ForgotPass";
import Network from "./Routes/Network";
import Profile from "./Routes/Profile";
import SignUp from "./Routes/SignUp";
import Usertypes from "./Models/UserProfileModel";

jest.mock("./firebase/config", () => ({
  auth: () => "test",
}));

jest.mock("./hooks/useAuthContext", () => ({
  __esModule: true,
  default: () => {
    return { user: null, authIsReady: true };
  },
}));

describe("App root", () => {
  test("Check and validate page navigation", async () => {
    await act(async () => {
      await render(<App />);
    });

    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();

    await act(async () => {
      const signupButton = await act(() => {
        return screen.getByText("Sign up here");
      });
      await userEvent.click(signupButton);
    });

    expect(await screen.getByText("Register")).toBeInTheDocument();

    /*
     This should be in a separate test, but the renderer for testing stays persistent between tests. Making it
     impossible to create a separate test that successively passes on its own and during an execution of all tests.
     Ideally the starting page should be settable between each test.
    */
    await act(async () => {
      const loginButton = await act(() => {
        return screen.getByText("Login here");
      });
      await userEvent.click(loginButton);
    });

    // Test login submission handler
    await act(async () => {
      const loginButton = await act(() => {
        return screen.getByTestId("submit-button");
      });
      await userEvent.click(loginButton);
    });

    await act(async () => {
      const emailField = await act(() => {
        return screen.getByPlaceholderText("Email");
      });
      await userEvent.type(emailField, "test@hotmail.com");
    });

    // await act(async () => {
    //   const resetButton = await act(() => {
    //     return screen.getByText("Reset");
    //   });
    //   await userEvent.click(resetButton);
    // });

    // This should be in a separate test
    await act(async () => {
      const signupButton = await act(() => {
        return screen.getByText("Sign up here");
      });
      await userEvent.click(signupButton);
    });

    await act(async () => {
      const firstNameField = await act(() => {
        return screen.getByPlaceholderText("First Name");
      });
      const lastNameField = await act(() => {
        return screen.getByPlaceholderText("Last Name");
      });
      const emailField = await act(() => {
        return screen.getByPlaceholderText("Email");
      });
      const passwordField = await act(() => {
        return screen.getByPlaceholderText("Password");
      });
      await userEvent.type(firstNameField, "Test");
      await userEvent.type(lastNameField, "Man");
      await userEvent.type(emailField, "test@hotmail.com");
      await userEvent.type(passwordField, "Test123@");
    });

    await act(async () => {
      const registerButton = await act(() => {
        return screen.getByText("Register");
      });
      await userEvent.click(registerButton);
    });

    // This should be in a separate test
    await act(async () => {
      const loginButton = await act(() => {
        return screen.getByText("Login here");
      });
      await userEvent.click(loginButton);
    });

    await act(async () => {
      const emailField = await act(() => {
        return screen.getByPlaceholderText("Email");
      });
      const passwordField = await act(() => {
        return screen.getByPlaceholderText("Password");
      });
      await userEvent.type(emailField, "Test@hotmail.com");
      await userEvent.type(passwordField, "Test123@");
    });

    await act(async () => {
      const loginButton = await act(() => {
        return screen.getAllByText("Login")[1];
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
        <UserProfile profile={{}}/>
      );
    });

    expect(
      await screen.getByText('About'),
    ).toBeInTheDocument();
  });
});

describe('Routes', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ users: "test"}),
      })
    );
  });

  // test('Render Network', async () => {
  //   await act(async () => {
  //     await render(
  //       <>
  //         <BrowserRouter>
  //           <Network />
  //         </BrowserRouter>
  //       </>
  //     );
  //   });
  // });

  test('Render Notifications', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <UserNotifications />
          </BrowserRouter>
        </>
      );
    });
  });

  test('Render Profile', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <Profile />
          </BrowserRouter>
        </>
      );
    });
  });

  // test('Render ScreenContent', async () => {
  //   await act(async () => {
  //     await render(
  //       <>
  //         <BrowserRouter>
  //           <ScreenContent />
  //         </BrowserRouter>
  //       </>
  //     );
  //   });
  // });
});

describe('SearchBar', () => {
  test('Render SearchBar', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <SearchBar  inputChangeHandler={() => {}} loading={false} outsideClicked={() => {}} searchOpen={true}
                        searchResults={[]} />
          </BrowserRouter>
        </>
      );
    });

    await act(async () => {
      const link0 = await act(() => {
        return screen.getByTestId("link-click-0");
      });
      await userEvent.click(link0);
    });
  });

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
  test('Render UserNotifications', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <UserNotifications />
          </BrowserRouter>
        </>
      );
    });
  });

  // test('Render UserNotificationsAlert', async () => {
  //   await act(async () => {
  //     await render(
  //       <>
  //         <BrowserRouter>
  //           <Alert  description="test" time={100}  type="some type" />
  //         </BrowserRouter>
  //       </>
  //     );
  //   });
  // });
  //
  // test('Render UserNotificationsConnectionInvite', async () => {
  //   await act(async () => {
  //     await render(
  //       <>
  //         <BrowserRouter>
  //           <ConnectionInvite connection_message="hello" connections={2} job_title="professor" name="Bob"/>
  //         </BrowserRouter>
  //       </>
  //     );
  //   });
  // });
  //
  // test('Render UserNotificationsDashboard', async () => {
  //   await act(async () => {
  //     await render(
  //       <>
  //         <BrowserRouter>
  //           <Dashboard posts_views="2" search_appearances="professor" views_today="2"/>
  //         </BrowserRouter>
  //       </>
  //     );
  //   });
  // });
  //
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

    await act(async () => {
      const link0 = await act(() => {
        return screen.getByTestId("link-click-0");
      });
      await userEvent.click(link0);

      const link1 = await act(() => {
        return screen.getByTestId("link-click-1");
      });
      await userEvent.click(link1);
    });
  });
});

describe('MobileNav', () => {
  test('Render MobileNav', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <MobileNav links={[]} />
          </BrowserRouter>
        </>
      );
    });

    await act(async () => {
      const iconButton = await act(() => {
        return screen.getByTestId("icon-button");
      });
      await userEvent.click(iconButton);
    });
  });
});

describe('Route Handlers', () => {
  test('ForgotPass Handler', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <ForgotPass />
          </BrowserRouter>
        </>
      );
    });

    // Test forgot pass submission handler
    await act(async () => {
      const forgotPass = await act(() => {
        return screen.getByTestId('forgot-pass-button');
      });
      await userEvent.click(forgotPass);
    });
  });

  // test('Signup Handler', async () => {
  //   await act(async () => {
  //     await render(
  //       <>
  //         <BrowserRouter>
  //           <SignUp />
  //         </BrowserRouter>
  //       </>
  //     );
  //   });
  //
  //   await act(async () => {
  //     const signUp = await act(() => {
  //       return screen.getByTestId('signup-button');
  //     });
  //     await userEvent.click(signUp);
  //   });
  // });
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
    const res = await getUserProfile("Meme");

    expect(res.data).toBe(undefined);
  });
});
