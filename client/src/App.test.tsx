import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
// import UserProfile from "./components/UserProfile";

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
      let signupButton = await act(() => {
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
      let forgotPassButton = await act(() => {
        return screen.getByText("Login here");
      });
      await userEvent.click(forgotPassButton);
    });

    await act(async () => {
      let forgotPassButton = await act(() => {
        return screen.getByText("Forgot Password?");
      });
      await userEvent.click(forgotPassButton);
    });

    expect(screen.getByText("Forgot Password")).toBeInTheDocument();

    await act(async () => {
      let emailField = await act(() => {
        return screen.getByPlaceholderText("Email");
      });
      await userEvent.type(emailField, "test@hotmail.com");
    });

    await act(async () => {
      let resetButton = await act(() => {
        return screen.getByText("Reset");
      });
      await userEvent.click(resetButton);
    });

    // This should be in a separate test
    await act(async () => {
      let signupButton = await act(() => {
        return screen.getByText("Sign up here");
      });
      await userEvent.click(signupButton);
    });

    await act(async () => {
      let firstNameField = await act(() => {
        return screen.getByPlaceholderText("First Name");
      });
      let lastNameField = await act(() => {
        return screen.getByPlaceholderText("Last Name");
      });
      let emailField = await act(() => {
        return screen.getByPlaceholderText("Email");
      });
      let passwordField = await act(() => {
        return screen.getByPlaceholderText("Password");
      });
      await userEvent.type(firstNameField, "Test");
      await userEvent.type(lastNameField, "Man");
      await userEvent.type(emailField, "test@hotmail.com");
      await userEvent.type(passwordField, "Test123@");
    });

    await act(async () => {
      let registerButton = await act(() => {
        return screen.getByText("Register");
      });
      await userEvent.click(registerButton);
    });

    // This should be in a separate test
    await act(async () => {
      let loginButton = await act(() => {
        return screen.getByText("Login here");
      });
      await userEvent.click(loginButton);
    });

    await act(async () => {
      let emailField = await act(() => {
        return screen.getByPlaceholderText("Email");
      });
      let passwordField = await act(() => {
        return screen.getByPlaceholderText("Password");
      });
      await userEvent.type(emailField, "Test@hotmail.com");
      await userEvent.type(passwordField, "Test123@");
    });

    await act(async () => {
      let loginButton = await act(() => {
        return screen.getAllByText("Login")[1];
      });
      await userEvent.click(loginButton);
    });
  });
});

jest.mock("./http/getUserProfile", () => ({
  __esModule: true,
  default: async () => {
    return {
      data: {
        user: {
          name: "test",
          title: "test",
          location: "test",
          email: "test",
          phone: "test",
          website: "test",
          connections: "test",
          picture: "test",
          backdrop: "test",
          summary: "test",
          projects: [
            {
              title: " ",
              description: " ",
              startDate: " ",
              endDate: " ",
              technologies: [" "],
              picture: " ",
            },
          ],
          skills: [
            {
              name: " ",
              level: " ",
            },
          ],
          experience: [
            {
              company: " ",
              logo: " ",
              title: " ",
              location: " ",
              startDate: " ",
              endDate: " ",
              description: " ",
            },
          ],
          education: [
            {
              school: " ",
              logo: " ",
              degree: " ",
              location: " ",
              startDate: " ",
              endDate: " ",
              description: " ",
            },
          ],
          languages: [
            {
              name: " ",
              level: " ",
            },
          ],
          awards: [
            {
              title: " ",
              date: " ",
              awarder: " ",
              summary: " ",
            },
          ],
          courses: [
            {
              title: " ",
              number: " ",
              school: " ",
              startDate: " ",
              endDate: " ",
              description: " ",
            },
          ],
        },
      },
    };
  },
}));

// describe('User profile', () => {
//   test('Check and validate page navigation', async () => {
//     await act(async () => {
//       await render(
//         <UserProfile />
//       );
//     });

//     expect(
//       await screen.getByText('About'),
//     ).toBeInTheDocument();
//   });
// });
