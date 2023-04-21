import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./Routes/SignUp";
import Login from "./Routes/Login";
import MyProfile from "./Routes/MyProfile";
import useMediaQuery from '@mui/material/useMediaQuery';
import Profile from "./Routes/Profile";
import ChatPage from "./Routes/Chat";
import Notifications from "./Routes/Notifications";
import useAuthContext from "./hooks/useAuthContext";
import AuthHeader from "./components/AuthHeader";
import ForgotPass from "./Routes/ForgotPass";
import ScreenContent from "./Routes/ScreenContent";
import Network from "./Routes/Network";
import Feed from "./Routes/Feed";
import './i18n/i18n'
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  const { user, authIsReady } = useAuthContext();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const lightTheme = createTheme({
    palette: { primary: { main: "#4D47C3" } },
    typography: {fontFamily: "Poppins, sans-serif",},
    components: {
      MuiButton: {
        styleOverrides: {
          root:{fontFamily: "Poppins, sans-serif"},
          contained: { color: "white", backgroundColor: "#4D47C3" },
          text: {
            color: "#4D47C3",
            "&:hover": { backgroundColor: "rgba(77,71,195, .05)" },
          },
        },
      },
        MuiIconButton: {styleOverrides: {root:{color:'#4D47C3'},}},
        MuiChip: {styleOverrides: {root:{backgroundColor:'#4D47C3',color:'white'},}},
        MuiToolbar: {styleOverrides: {root:{backgroundColor:'white',color:'white'},}},
        MuiIcon: {styleOverrides: {root:{color:'#4D47C3'},}},

    },
  });
    const darkTheme = createTheme({
    palette: { primary: { main: "#706CC3" }, mode: "dark" },
    typography: {fontFamily: "Poppins, sans-serif"},
    components: {
        MuiButton: {
        styleOverrides: {
            root:{fontFamily: "Poppins, sans-serif"},
            contained: { color: "white", backgroundColor: "#4D47C3","&:hover": { backgroundColor: "#413b9f" } },
            text: {
              color:'primary.main',
                "&:hover": { backgroundColor: "rgba(77,71,195, .05)" },
            }
        }
        },
        MuiTypography: {styleOverrides: {root:{fontFamily: "Poppins, sans-serif", color:'#BCBCBC'},}},
        MuiCard: {styleOverrides: {root:{backgroundColor:'#2D2D2D',color:'#BCBCBC'},}},
        MuiIconButton: {styleOverrides: {root:{color:'#706CC3'},}},
        MuiCheckbox: {styleOverrides: {root:{color:'#706CC3'},checked:{color:'#706CC3'}}},
        MuiAutocomplete: {styleOverrides: {input:{borderColor:'red'},}},
        MuiPaper: {styleOverrides: {root:{backgroundColor:'#2D2D2D',color:'#BCBCBC'},}},
        MuiAccordionSummary: {styleOverrides: {root:{backgroundColor:'#2D2D2D',color:'#BCBCBC'},}},
        MuiAccordionDetails: {styleOverrides: {root:{backgroundColor:'#2D2D2D',color:'#BCBCBC'},}},


    }
    })

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/feed" /> : <Navigate to="/login" />
              }
            />
            <Route path="/*" element={<ScreenContent />}>
              <Route
                path="profile/:id"
                element={user ? <Profile /> : <Navigate to="/" />}
              />
              <Route
                path="chat"
                element={user ? <ChatPage /> : <Navigate to="/" />}
              >
                <Route path=":id" element={<ChatPage/>}/>
              </Route>
              <Route
                path="myprofile"
                element={user ? <MyProfile /> : <Navigate to="/" />}
              />
              <Route
                path="network"
                element={user ? <Network /> : <Navigate to="/" />}
              />
              <Route
                path="notifications"
                element={user ? <Notifications /> : <Navigate to="/" />}
              />
              <Route
                path="feed"
                element={user ? <Feed /> : <Navigate to="/" />}
              />
              <Route
                path="jobs"
                element={user ? <Feed /> : <Navigate to="/" />}
              />
            </Route>

            <Route path="/*" element={<AuthHeader />}>
              <Route
                path="signup"
                element={!user ? <SignUp /> : <Navigate to="/" />}
              />
              <Route
                path="login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />

              <Route
                path="forgot"
                element={!user ? <ForgotPass /> : <Navigate to="/" />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}

export default App;
