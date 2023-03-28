import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";

import ForgotPass from "./ForgotPass";
import Network from "./Network";
import Profile from "./Profile";
import SignUp from "./SignUp";
import TagSelection from "./Feed/NewPostModal/TagSelection";
import Feed from "./Feed";
import FeedCard from "./Feed/FeedCard";
import Comments from "./Feed/FeedCard/Comments";
import NewPostModal from "./Feed/NewPostModal";
import MyProfile from "./MyProfile";
import JobSettingsModal from "./Feed/NewPostModal/JobSettingsModal";

jest.mock("../firebase/config", () => ({
  auth:
    {currentUser: {getIdToken: () => {return "testToken";}, uid: "testUID"}},
}));

describe('Routes', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          data: {
            users: "test", connections: [], user:
              {picture: "test"}
          }
        },), ok: true, blob: () => {return "";}
      })
    );
  });

  test('Render Network', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <Network />
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
});

describe('Route Handlers', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          data: {
            users: "test", connections: [], user:
              {
                preferenceTags: [""], projects: [""], skills: [""], experience: [""], education: [""], languages: [""],
                awards: [""], courses: [""]
              }
          }
        }), ok: true, blob: () => {return;}
      })
    );
  });

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

  test('Profile Handler', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <MyProfile />
          </BrowserRouter>
        </>
      );
    });
  });

  test('Signup Handler', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <SignUp />
          </BrowserRouter>
        </>
      );
    });
  });
});

describe('Test user feed', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({json: () => Promise.resolve({ data: {users: "test", connections: []} }), ok: true,
        blob: () => {return "";}})
    );

    URL.createObjectURL = jest.fn(() => 'http://www.test.com');
  });

  test('Render Feed', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <Feed />
          </BrowserRouter>
        </>
      );
    });
  });


  test('Render TagSelection', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <TagSelection />
          </BrowserRouter>
        </>
      );
    });
  });

  test('Render FeedCard', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <FeedCard postSettings={{}} postInfo={{text: 'text'}} userInfo={{}} />
          </BrowserRouter>
        </>
      );
    });
  });

  test('Render FeedCard Comments', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <Comments />
          </BrowserRouter>
        </>
      );
    });
  });

  test('Render NewPostModal', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <NewPostModal />
          </BrowserRouter>
        </>
      );
    });
  });

  test('Render NewPostModal JobSettingsModal', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <JobSettingsModal />
          </BrowserRouter>
        </>
      );
    });
  });
});
