import React from 'react';

import  {
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';

import CssBaseline from '@material-ui/core/CssBaseline';

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

      </ThemeProvider>
    )
  }

}


export default App;
