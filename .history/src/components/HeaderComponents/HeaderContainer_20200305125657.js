import React, {useState, useRef} from 'react';

import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import StarsIcon from '@material-ui/icons/Stars';

import IconButton from '@material-ui/core/IconButton';

const HeaderContainer = ({}) => {

    const [open, setOpen]  = useState(false),
          anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen)
    }

    const handleClose = event => {
        if(anchorRef.current && anchorRef.current.contains(event.target)){
            return;
        }

        setOpen(false);
    }

    function handleListKeyDown(event){
        if(event.key === 'Tab'){
            event.preventDefault();
            setOpen(false);
        }
    }

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
            <div
                className={'menuHeaderIcons'}
            >
                <IconButton>
                    <StarsIcon />
                </IconButton>
                <IconButton>
                    <AccountCircleIcon />
                </IconButton>

            </div>
        </AppBar>
    )
}

export default HeaderContainer;