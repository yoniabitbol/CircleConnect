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
import Feed from "./Routes/Feed";
import MyUserProfile from "./components/MyUserProfile";
import Banner from "./components/UserProfile/Banner";
import Dashboard from "./components/UserProfile/Dashboard";
import getOutgoingConnectionRequests from "./http/getOutgoingConnectionRequests";
import ConnectionRow from "./components/ConnectionRow";
import ConnectionsBanner from "./components/ConnectionsBanner";
import NavBar from "./components/Navbar";
import MyProfile from "./Routes/MyProfile";
import acceptConnectionRequest from "./http/acceptConnectionRequest";
import cancelConnectionRequest from "./http/cancelConnectionRequest";
import declineConnectionRequest from "./http/declineConnectionRequest";
import TagSelection from "./Routes/Feed/NewPostModal/TagSelection";
import NavLinks from "./components/Navbar/NavLinks";
import sendConnectionRequest from "./http/sendConnectionRequest";
import removeConnectionRequest from "./http/removeConnection";
import getUserProfilePic from "./http/getUserPicturePic";

jest.mock("./firebase/config", () => ({
auth:
    {currentUser: {getIdToken: () => {return "testToken";}, uid: "testUID"}},
}));

jest.mock("./hooks/useAuthContext", () => ({
  __esModule: true,
  default: () => {
    return { user: null, authIsReady: true };
  },
}));

describe("App root", () => {
  test("Check and main application module", async () => {
    await act(async () => {
      await render(<App/>);
    });
  });
});

describe('Test user profile components', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({json: () => Promise.resolve({ users: "test" }),})
    );
  });

  test('Render UserProfile', async () => {
    await act(async () => {
      await render(
        <UserProfile profile={{}}/>
      );
    });

    expect(
      await screen.getByText('About'),
    ).toBeInTheDocument();
  });

  test('Render UserProfile Banner', async () => {
    await act(async () => {
      await render(
        <BrowserRouter>
          <Banner banner={{connections: [],}}/>
        </BrowserRouter>
      );
    });
  });

  test('Render UserProfile Dashboard', async () => {
    await act(async () => {
      await render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });
  });
});

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
        }), ok: true, blob: () => {return "";}
      })
    );

    // @ts-ignore
    global.URL = jest.fn(() => {return {createObjectURL: () => {return "";}};})
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

describe('Test user feed', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({json: () => Promise.resolve({ data: {users: "test", connections: []} }), ok: true})
    );
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
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          data: {
            users: "test", connections: [], user:
                          {
              projects: [""], skills: [""], experience: [""], education: [""], languages: [""],
                                          awards: [""], courses: [""]
}
            }
          }), ok: true
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
  //
  //   await act(async () => {
  //     const signUp = await act(() => {
  //       return screen.getByTestId('signup-button');
  //     });
  //     await userEvent.click(signUp);
  //   });
  });
});

describe('httpRequests', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ users: "test", connections: [] }), ok: true,
          blob: () => {return;}
      })
    );

    // @ts-ignore
    global.URL = jest.fn(() => {return {createObjectURL: () => {return "";}};})
  });

  test('Request allUsers', async () => {
    const res = await getAllUsers();

    expect(res.users).toBe("test");
  });

  test('Request currentUserprofile', async () => {
    const res = await getCurrentUserProfile();

    expect(res.users).toBe("test");
  });

  test('Request saveUserToDB', async () => {
    const res = await saveUserToDB("test", "test", "test", "test");

    expect(res.users).toBe("test");
  });

  test('Request updateUserProfile', async () => {
    const res = await updateUserProfile(new FormData());

    expect(res.users).toBe("test");
  });

  test('Request userProfile', async () => {
    const res = await getUserProfile("Meme");

    expect(res.data).toBe(undefined);
  });

  test('Get outgoing requests', async () => {
    const res = await getOutgoingConnectionRequests();

    expect(res.data).toBe(undefined);
  });

  test('acceptConnectionRequest', async () => {
    await acceptConnectionRequest("test");
  });

  test('cancelConnectionRequest', async () => {
    await cancelConnectionRequest("test");
  });

  test('declineConnectionRequest', async () => {
    await declineConnectionRequest("test");
  });

  test('sendConnectionRequest', async () => {
    await sendConnectionRequest("test");
  });

  test('removeConnectionRequest', async () => {
    await removeConnectionRequest("test");
  });

  // test('getUserProfilePic', async () => {
  //   await getUserProfilePic("test");
  // });
});

describe('Test userProfile Components', () => {
  test('Render MyUserProfile', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <MyUserProfile profile={{}} />
          </BrowserRouter>
        </>
      );
    });
  });
});

describe('Render misc components', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({data: {users: "test", connections: [], user: {picture: "" }}}),
                ok: true, blob: () => {return "";}
        })
    );

    // @ts-ignore
    global.URL = jest.fn(() => {return {createObjectURL: () => {return "";}};})
  });

  test('Render ConnectionRow', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <ConnectionRow  connections={[]}  name={''} picture={''} title={''}/>
          </BrowserRouter>
        </>
      );
    });
  });

  test('Render ConnectionsBanner', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <ConnectionsBanner  connections={[]} />
          </BrowserRouter>
        </>
      );
    });
  });

  // test('Render NavBar', async () => {
  //   await act(async () => {
  //     await render(
  //       <>
  //         <BrowserRouter>
  //           <NavBar openSearch={false} searchClicked={() => {return;}} outsideClicked={() => {return;}}/>
  //         </BrowserRouter>
  //       </>
  //     );
  //   });

  // test('Render NavLinks', async () => {
  //   await act(async () => {
  //     await render(
  //       <>
  //         <BrowserRouter>
  //           <NavLinks  links={[]}/>
  //         </BrowserRouter>
  //       </>
  //     );
  //   });
  // });
});
