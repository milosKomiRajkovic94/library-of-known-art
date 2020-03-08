import React, {useState, useRef} from 'react';

import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import StarsIcon from '@material-ui/icons/Stars';
import StarsTwoToneIcon from '@material-ui/icons/StarsTwoTone';

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

import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';

import MovieFilterTwoToneIcon from '@material-ui/icons/MovieFilterTwoTone';

import PanoramaTwoToneIcon from '@material-ui/icons/PanoramaTwoTone';

import MusicNoteTwoToneIcon from '@material-ui/icons/MusicNoteTwoTone';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';

import AddCircleOutlineTwoTone from '@material-ui/icons/AddCircleOutlineTwoTone';

import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';

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

        setLeftSidebar(leftSidebar)
    }

    return(
        <AppBar 
            position={'fixed'}
            className={'appBar'}
        >
            <IconButton 
                onClick={toggleLeftSidebar(true)}
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                open={leftSidebar}
                onClose={toggleLeftSidebar(false)}
                onOpen={toggleLeftSidebar(true)} 
            >
                <div
                    className={'sidebar'}
                    role={'presentation'}
                    onClick={toggleLeftSidebar(false)} 
                    onKeyDown={toggleLeftSidebar(false)}
                >
                    <span
                        className={'labelForSidebar'}
                    >
                        <AddCircleOutlineTwoTone 
                            className={'sidebarIcon'}
                        />
                        Add new 
                    </span>
                    <List
                        className={'addNewList'}
                    >
                        {[{label: 'Book', icon: <MenuBookTwoToneIcon />}, {label: 'Movie', icon: <MovieFilterTwoToneIcon />}, {label: 'Picture', icon: <PanoramaTwoToneIcon />}, {label: 'Music', icon: <MusicNoteTwoToneIcon />}].map((obj, index) => (
                            <ListItem 
                                key={obj.label + index}
                                className={'newListItem'}
                            >
                                <ListItemIcon>{obj.icon}</ListItemIcon>
                                {obj.label}
                            </ListItem>
                        ))}
                    </List>
                    <span
                        className={'cursorPointer labelForSidebar'}
                    >
                        <StarsTwoToneIcon 
                            className={'sidebarIcon'}
                        />
                        Overview of favorites
                    </span>
                    <span 
                        className={'cursorPointer labelForSidebar'}
                    >
                        <DescriptionTwoToneIcon
                            className={'sidebarIcon'}
                        />
                        Description of the app
                    </span>
                </div>
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