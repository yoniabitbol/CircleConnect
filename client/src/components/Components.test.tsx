import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";
import UserProfile from "./UserProfile";
import Banner from "./UserProfile/Banner";
import Dashboard from "./UserProfile/Dashboard";
import NavSettings from "./UserNotifications/NavSettings";
import UserNotifications from "./UserNotifications";
import SearchBar from "./SearchBar";
import SearchResultsBox from "./SearchBar/SearchResultsBox";
import MobileNav from "./Navbar/MobileNav";
import ConnectionRow from "./ConnectionRow";
import ConnectionsBanner from "./ConnectionsBanner";
import UserProfileBanner from "./UserProfileBanner";
// import NavBar from "./Navbar";
import NavLinks from "./Navbar/NavLinks";
import ApplyDropUp from "./ApplyDropUp";
import Alert from "./UserNotifications/Alert";
import ConnectionInvite from "./UserNotifications/ConnectionInvite";
import ConnectionInviteRead from "./UserNotifications/ConnectionInviteRead";
import MessageNotification from "./UserNotifications/MessageNotification";

jest.mock("../firebase/config", () => ({
  auth:
    {currentUser: {getIdToken: () => {return "testToken";}, uid: "testUID"}},
}));

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
        // @ts-ignore
        <UserProfile profile={{}}/>
      );
    });
  });

  test('Render UserProfile Banner', async () => {
    await act(async () => {
      await render(
        <BrowserRouter>
          <Banner banner={{name: '', title: '', location: '', email: '', phone: '', website: '', connections: [''], picture: '', backdrop: ''}} />
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

describe('Test user notification components', () => {
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

  test('Render Alert', async () => {
    await act(async () => {
      await render(
          <>
            <BrowserRouter>
              <Alert  description={""} time={0} type={""}/>
            </BrowserRouter>
          </>
      );
    });
  });

  test('Render ConnectionInvite', async () => {
    await act(async () => {
      await render(
          <>
            <BrowserRouter>
              <ConnectionInvite  initiatorID={""}/>
            </BrowserRouter>
          </>
      );
    });
  });

  test('Render ConnectionInviteRead', async () => {
    await act(async () => {
      await render(
          <>
            <BrowserRouter>
              <ConnectionInviteRead  initiatorID={""}/>
            </BrowserRouter>
          </>
      );
    });
  });

  test('Render MessageNotification', async () => {
    await act(async () => {
      await render(
          <>
            <BrowserRouter>
              <MessageNotification  initiatorID={""}/>
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
            <SearchBar  inputChangeHandler={() => {return;}} loading={false} outsideClicked={() => {return;}} searchOpen={true}
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

describe('Render misc components', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({data: {users: "test", connections: [], user: {picture: "" }}}),
        ok: true, blob: () => {return "";}
      })
    );

    URL.createObjectURL = jest.fn(() => 'http://www.test.com');
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

  test('Render UserProfileBanner', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <UserProfileBanner  location={''} name={''} profilePic={''} title={''} userBackdrop={''}/>
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
  //           <NavBar openSearch={false} searchClicked={() => {
  //             return;
  //           }} outsideClicked={() => {
  //             return;
  //           }}/>
  //         </BrowserRouter>
  //       </>
  //     );
  //   });
  // });

  test('Render NavLinks', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <NavLinks  links={[]}/>
          </BrowserRouter>
        </>
      );
    });
  });

  test('Render ApplyDropUp', async () => {
    await act(async () => {
      await render(
        <>
          <BrowserRouter>
            <ApplyDropUp postSettings={{}} postId={''}/>
          </BrowserRouter>
        </>
      );
    });
  });
});