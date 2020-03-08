import React from 'react';

import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import AccountIcon from '@material-ui/icons/AccountIcon';

import IconButton from '@material-ui/core/IconButton';

class HeaderContainer extends React.Component{

    render(){
        return(
            <AppBar 
                position={'fixed'}
                className={'appBar'}
            >
                <IconButton 

                >
                    <MenuIcon />
                </IconButton>
                <Toolbar 
                    className={'toolbar'}
                >
                    <Typography 
                        variant={'h6'}
                        display={'block'}
                    >
                        Arts library
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default HeaderContainer;