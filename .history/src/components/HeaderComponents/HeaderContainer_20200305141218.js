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

import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import VpnKeyIcon from '@material-ui/icons/VpnKey';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const HeaderContainer = () => {

    const [open, setOpen]  = useState(false),
          anchorRef = useRef(null),
          [leftSidebar, setLeftSidebar] = useState(false);

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

    const toggleLeftSidebar = (leftSidebar) => event => {
        if(event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }

        setLeftSidebar({leftSidebar: leftSidebar})
    }

    return(
        <AppBar 
            position={'fixed'}
            className={'appBar'}
        >
            <IconButton 
                onClick={toggleDrawer( true)}
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                open={leftSidebar}
                onClose={toggleLeftSidebar(false)}
                onOpen={toggleLeftSidebar(true)} 
            >
                Something
            </SwipeableDrawer>
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
                    <Grow>
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
                                    <PermIdentityIcon />
                                    <Typography
                                        className={'menuItem'}
                                    >
                                        My profile
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={handleClose}
                                >
                                    <VpnKeyIcon />
                                    <Typography
                                        className={'menuItem'}
                                    >
                                        Change password
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={handleClose}
                                >
                                    <ExitToAppIcon />
                                    <Typography
                                        className={'menuItem'}
                                    >
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Grow>
                </Popper>
            </div>
        </AppBar>
    )
}

export default HeaderContainer;