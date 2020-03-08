import React from 'react';

import  {
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';

import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';

import CssBaseline from '@material-ui/core/CssBaseline';

import HeaderContainer from './components/HeaderComponents/HeaderContainer';

import HomePageContainer from './components/HomePageComponents/HomePageContainer';

import { SnackbarProvider } from 'notistack';

import FooterContainer from './components/FooterComponents/FooterContainer';


class App extends React.Component{

  render(){

    const theme = createMuiTheme({
      typeography: {
        fontFamily: 'SourceSansPro-Regular'
      }
    })

    return(
      <ThemeProvider
        theme={theme}
      >
        <SnackbarProvider>
          <CssBaseline />
          <HeaderContainer />
          <Toolbar />
          <Router>
            <Switch>
              <Route path={'/'}>
                <HomePageContainer />
              </Route>
            </Switch>
          </Router>
          <FooterContainer />
        </SnackbarProvider>
      </ThemeProvider>
    )
  }

}


export default App;
