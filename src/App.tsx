import React, {Suspense, useEffect, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {Box, Container, createTheme, Stack} from "@mui/material";
import {useDispatch} from "react-redux";
import {ThemeProvider} from "@emotion/react";
import Nav from "./components/Nav/Nav";
import Preloader from "./components/common/preloader/preloader";
import {UsersPage} from "./components/Users/UsersContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Login} from "./components/Login/Login";
import {Header} from "./components/Header/Header";
import {initializeApp} from "./redux/appReducer";
import {useTypedDispatch} from "./redux/reduxStore";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./pages/ChatPage'))

export const App: React.FC = (props) => {

  const [mode, setMode] = useState('light')

  const darkTheme = createTheme({
    palette: {
      // @ts-ignore
      mode: mode
    }
  })

  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return (
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={'background.default'} color={'text.primary'}>
          <Container maxWidth='lg'>
            <Header/>
            <Stack direction='row' justifyContent='space-between'>
              <Nav/>
              <Box flex={4}>
                <Suspense fallback={<Preloader/>}>
                  <Routes>
                    <Route path='/profile' element={<ProfileContainer/>}>
                      <Route path=':userId' element={<ProfileContainer/>}/>
                    </Route>
                    <Route path='/dialogs' element={<DialogsContainer/>}/>
                    <Route path='/users' element={<UsersPage/>}/>
                    <Route path='/chat' element={<ChatPage/>}/>
                  </Routes>
                </Suspense>
                <Routes>
                  <Route path='/news' element={<News/>}/>
                  <Route path='/music' element={<Music/>}/>
                  <Route path='/settings' element={<Settings mode={mode} setMode={setMode}/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path="/" element={<Navigate to="/profile"/>}/>
                </Routes>
              </Box>
            </Stack>
          </Container>
        </Box>
      </ThemeProvider>
  )
      ;
}
