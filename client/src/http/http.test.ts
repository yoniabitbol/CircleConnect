import "@testing-library/jest-dom";
import acceptConnectionRequest from "./acceptConnectionRequest";
import cancelConnectionRequest from "./cancelConnectionRequest";
import declineConnectionRequest from "./declineConnectionRequest";
import getAllUsers from "./getAllUsers";
import getCurrentUserProfile from "./getCurrentUserProfile";
import getUserProfile from "./getUserProfile";
import saveUserToDB from "./saveUserToDB";
import updateUserProfile from "./updateUserProfile";
import sendConnectionRequest from "./sendConnectionRequest";
import removeConnectionRequest from "./removeConnection";
import getUserProfilePic from "./getUserPicturePic";
import getOutgoingConnectionRequests from "./getOutgoingConnectionRequests";
import applyToPost from "./applyToPost";
import commentPost from "./commentPost";
import createPost from "./createPost";
import getJobFeed from "./getJobFeed";
import getPostImage from "./getPostImage";
import getSocialFeed from "./getSocialFeed";
import likePost from "./likePost";
import updateUserPreferenceTags from "./updateUserPreferenceTags";
import withdrawFromPost from "./withdrawFromPost";
import getUserConnections from "./getUserConnections";
import getIncomingConnectionRequests from "./getIncomingConnectionRequests";

jest.mock("../firebase/config", () => ({
  auth:
    {currentUser: {getIdToken: () => {return "testToken";}, uid: "testUID"}},
}));

describe('httpRequests', () => {
  beforeEach(async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ users: "test", connections: [] }), ok: true,
        blob: () => {return;}
      })
    );

    URL.createObjectURL = jest.fn(() => 'http://www.test.com');
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

  test('applyToPost', async () => {
    const formData = new FormData();
    await applyToPost("test", formData);
  });

  test('commentPost', async () => {
    await commentPost("test", "test");
  });

  test('createPost', async () => {
    const formData = new FormData();
    await createPost(formData);
  });

  test('getJobFeed', async () => {
    await getJobFeed();
  });

  test('getPostImage', async () => {
    await getPostImage("test");
  });

  test('getSocialFeed', async () => {
    await getSocialFeed();
  });

  test('likePost', async () => {
    await likePost("test");
  });

  test('updateUserPreferenceTags', async () => {
    await updateUserPreferenceTags(["test"]);
  });

  test('withdrawFromPost', async () => {
    await withdrawFromPost("test");
  });

  test('getUserProfilePic', async () => {
    await getUserProfilePic("test");
  });

  test('getIncomingConnectionRequests', async () => {
    await getIncomingConnectionRequests();
  });

  test('getIncommenting', async () => {
    await getUserConnections("test");
  });
});