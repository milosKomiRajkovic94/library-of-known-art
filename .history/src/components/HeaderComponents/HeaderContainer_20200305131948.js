import React, {useState, useRef} from 'react';

import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import StarsIcon from '@material-ui/icons/Stars';

import IconButton from '@material-ui/core/IconButton';

import Popper from '@material-ui/core/Popper';

import Grow from '@material-ui/core/Grow';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import MenuItem from '@material-ui/core/MenuItem';

import MenuList from '@material-ui/core/MenuList';

const HeaderContainer = ({}) => {

    const [open, setOpen]  = useState(false),
          anchorRef = useRef(null);

    function handleToggle(){
        setOpen(prevOpen => !prevOpen)
    }

    function handleClose(event){
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
                <IconButton
                >
                    <StarsIcon />
                </IconButton>
                <IconButton
                    onClick={handleToggle}
                    aria-controls={open ? 'userOptions' : undefined}
                    aria-haspopup={'true'}
                    ref={anchorRef}
                >
                    <AccountCircleIcon />
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                {({TransitionProps, placement}) => (
                    <Grow 
                        // {...TransitionProps}
                    >
                        <ClickAwayListener 
                            onClickAway={handleClose}>
                            <MenuList
                                id={'userOptions'}
                                autoFocusItem={open}
                                onKeyDown={handleListKeyDown}
                            >
                                <MenuItem
                                    onClick={handleClose}
                                >
                                    My profile
                                </MenuItem>
                                <MenuItem
                                    onClick={handleClose}
                                >
                                    Change password
                                </MenuItem>
                                <MenuItem
                                    onClick={handleClose}
                                >
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Grow>
                )}
                </Popper>
            </div>
        </AppBar>
    )
}

export default HeaderContainer;