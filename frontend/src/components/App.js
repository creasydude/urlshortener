import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Storage from 'local-storage-fallback';

//Components
import UrlShortener from './UrlShortener';
import ShowUrlShortened from './ShowUrlShortened';
import Header from './Header';
import Footer from './Footer';

const lightColors = {
  bgColor: "#FCEFEE",
  hfbBgColor: "#FC5C9C",
  hfbColor: "#FFFFFF",
  mainTextColor: "#000000",
  borderForNote: "#FC5C9C",
  bgForNote: "#fff",
  btnSubmit: "#fc8cb9",
}

const darkColors = {
  bgColor: "#393E46",
  hfbBgColor: "#222831",
  hfbColor: "#EEEEEE",
  mainTextColor: "#FFD369",
  borderForNote: "#FFD369",
  bgForNote: "#e8e9ea",
  btnSubmit: "#64686e",
}

const themes = {
  dark: darkColors,
  light: lightColors,
}

function App() {
  const initialTheme = () => {
    const themeStatus = Storage.getItem('theme-mode');
    return themeStatus ? themeStatus : 'light';
  }
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    Storage.setItem('theme-mode', theme)
  }, [theme])

  const themeHandler = () => {
    setTheme(theme === 'light' ? "dark" : 'light')
  }

  return (
    <ThemeProvider theme={themes[theme]}>
      <Container>
        <Header thememode={theme} themeHandler={themeHandler} />
        <Switch>
          <Route path="/" exact>
            <UrlShortener />
          </Route>
          <Route path="/:url" exact>
            <ShowUrlShortened />
          </Route>
        </Switch>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`

`;