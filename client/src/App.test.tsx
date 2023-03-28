import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";

import App from "./App";

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