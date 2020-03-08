import React, {useState, useRef} from 'react';

import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

import IconButton from '@material-ui/core/IconButton';

import Popover from '@material-ui/core/Popover';

import Grow from '@material-ui/core/Grow';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import MenuItem from '@material-ui/core/MenuItem';

import MenuList from '@material-ui/core/MenuList';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import HomeIcon from '@material-ui/icons/Home';

import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

import VpnKeyIcon from '@material-ui/icons/VpnKey';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';

import MovieFilterTwoToneIcon from '@material-ui/icons/MovieFilterTwoTone';

import PanoramaTwoToneIcon from '@material-ui/icons/PanoramaTwoTone';

import MusicNoteTwoToneIcon from '@material-ui/icons/MusicNoteTwoTone';

import MenuBookIcon from '@material-ui/icons/MenuBook';

import MovieFilterIcon from '@material-ui/icons/MovieFilter';

import PanoramaIcon from '@material-ui/icons/Panorama';

import MusicNoteIcon from '@material-ui/icons/MusicNote';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';

import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import DescriptionIcon from '@material-ui/icons/Description';

import Badge from '@material-ui/core/Badge';

import Tooltip from '@material-ui/core/Tooltip';

import {connect} from 'react-redux';

import {toogleLookingAtFavoritesOnly} from '../../actions/artActions';

import { bindActionCreators } from 'redux';

import DialogForInsertOrUpdate from '../../utils/DialogForInsertOrUpdate';

import DescriptionDialog from '../../components/DescriptionComponents/DescriptionDialog';

const HeaderContainer = ({artsFavoriteNumber, arts, toogleLookingAtFavoritesOnly}) => {

    const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false),
          [openDialogForInsertOrUpdate, setOpenDialogForInsertOrUpdate] = useState(false),
          [passedInsertType, setPassedInsertType] = useState(''),
          [userInfoOpen, setUserInfoOpen]  = useState(false),
          anchorUserInfoRef = useRef(null),
          [leftSidebar, setLeftSidebar] = useState(false),
          [addNewOpen, setAddNewOpen] = useState(false),
          anchorAddNewRef = useRef(null);

    function toggleOpenDescriptionDialog(){
        setOpenDescriptionDialog(prevOpenDescriptionDialog => !prevOpenDescriptionDialog);
    }

    function toggleOpenDialogForInsertOrUpdate(valueOfInsertType){
        if(valueOfInsertType){
            setPassedInsertType(valueOfInsertType);
        }else{
            setPassedInsertType('');
        }
        setOpenDialogForInsertOrUpdate(prevOpenDialogForInsertOrUpdate => !prevOpenDialogForInsertOrUpdate)
    }

    function handleAddNewMenuToggle(){
        setAddNewOpen(prevAddNewOpen => !prevAddNewOpen);
        setUserInfoOpen(false);
    }

    function handleUserInfoMenuToggle(){
        setUserInfoOpen(prevUserInfoOpen => !prevUserInfoOpen)
        setAddNewOpen(false);
    }

    function handleAddNewMenuClose(event){
        if(anchorAddNewRef.current && anchorAddNewRef.current.contains(event.target)){
            return;
        }

        setAddNewOpen(false);
    }

    function handleUserInfoMenuClose(event){
        if(anchorUserInfoRef.current && anchorUserInfoRef.current.contains(event.target)){
            return;
        }

        setUserInfoOpen(false);
    }

    function handleAddNewListKeyDown(event){
        if(event.key === 'Tab'){
            event.preventDefault();
            setAddNewOpen(false);
        }
    }

    function handleUserListKeyDown(event){
        if(event.key === 'Tab'){
            event.preventDefault();
            setUserInfoOpen(false);
        }
    }

    const toggleLeftSidebar = (leftSidebar) => event => {
        if(event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }

        setLeftSidebar(leftSidebar)
    }

    return(
        <React.Fragment>
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
                        <Typography
                            variant={'h6'}
                            display={'block'}
                            className={'titleOfTheApp'}

                        >
                            L͓̽i͓̽b͓̽r͓̽a͓̽r͓̽y͓̽ o͓̽f͓̽ k͓̽n͓̽o͓̽w͓̽n͓̽ a͓̽r͓̽t͓̽
                        </Typography>
                        <span
                            className={'labelForSidebar'}
                        >
                            <AddCircleOutlineTwoToneIcon 
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
                                    onClick={() => toggleOpenDialogForInsertOrUpdate(obj.label.toLowerCase())}
                                >
                                    <ListItemIcon>{obj.icon}</ListItemIcon>
                                    {obj.label}
                                </ListItem>
                            ))}
                        </List>
                        <span
                            className={'cursorPointer labelForSidebar uniqueOptionForSidebar'}
                            onClick={(event) => toogleLookingAtFavoritesOnly(arts, true)}
                        >
                            <FavoriteTwoToneIcon 
                                className={'sidebarIcon'}
                            />
                            Overview of favorites
                        </span>
                        <span 
                            className={'cursorPointer labelForSidebar uniqueOptionForSidebar'}
                            onClick={toggleOpenDescriptionDialog}
                        >
                            <DescriptionTwoToneIcon
                                className={'sidebarIcon'}
                            />
                            Description of app
                        </span>
                        <span
                            className={'cursorPointer labelForSidebar uniqueOptionForSidebar'}
                            onClick={(event) => toogleLookingAtFavoritesOnly(arts, false)}
                        >
                            <HomeTwoToneIcon
                                className={'sidebarIcon'}
                            />
                            Home
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
                        L͓̽i͓̽b͓̽r͓̽a͓̽r͓̽y͓̽ o͓̽f͓̽ k͓̽n͓̽o͓̽w͓̽n͓̽ a͓̽r͓̽t͓̽
                    </Typography>
                </Toolbar>
                <div
                    className={'menuHeaderIcons'}
                >
                    <Tooltip
                        title={'Home'}
                    >
                        <IconButton
                            onClick={(event) => toogleLookingAtFavoritesOnly(arts, false)}
                        >
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title={'Description of app'}
                    >
                        <IconButton
                            onClick={toggleOpenDescriptionDialog}
                        >
                            <DescriptionIcon />
                        </IconButton>
                    </Tooltip>
                    <Badge  
                        badgeContent={artsFavoriteNumber ? artsFavoriteNumber: undefined}
                    >
                        <Tooltip
                            title={'Overview of favorites'}
                        >
                            <IconButton
                                onClick={(event) => toogleLookingAtFavoritesOnly(arts, true)}
                            >

                                    <FavoriteIcon />
                            </IconButton>
                        </Tooltip>
                    </Badge>
                    <Tooltip
                        title={'Add new'}
                    >
                        <IconButton 
                            onClick={handleAddNewMenuToggle}
                            aria-controls={addNewOpen ? 'addNewOptions' : undefined}
                            aria-haspopup={'true'}
                            ref={anchorAddNewRef}
                        >

                            <AddCircleIcon />
                        </IconButton>
                    </Tooltip>
                    <Popover 
                        open={addNewOpen}
                        anchorEl={anchorAddNewRef ? anchorAddNewRef.current : undefined}
                        role={undefined}
                        disablePortal 
                        className={'headerPopover'}
                    >
                        <Grow>
                            <ClickAwayListener
                                onClickAway={handleAddNewMenuClose}
                            >
                                <MenuList
                                    id={'addNewOptions'}
                                    autoFocusItem={addNewOpen}
                                    onKeyDown={handleAddNewListKeyDown}
                                >
                                    <MenuItem 
                                        onClick={(event) => {handleAddNewMenuClose(event); toggleOpenDialogForInsertOrUpdate('book');}}
                                    >
                                        <MenuBookIcon />
                                        <Typography 
                                            className={'menuItem'}
                                        >   
                                            Book
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem 
                                        onClick={(event) => {handleAddNewMenuClose(event); toggleOpenDialogForInsertOrUpdate('movie');}}
                                    >
                                        <MovieFilterIcon />
                                        <Typography 
                                            className={'menuItem'}
                                        >   
                                            Movie
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem 
                                        onClick={(event) => {handleAddNewMenuClose(event); toggleOpenDialogForInsertOrUpdate('picture');}}
                                    >
                                        <PanoramaIcon />
                                        <Typography 
                                            className={'menuItem'}
                                        >   
                                            Picture
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem 
                                        onClick={(event) => {handleAddNewMenuClose(event); toggleOpenDialogForInsertOrUpdate('music');}}
                                    >
                                        <MusicNoteIcon />
                                        <Typography 
                                            className={'menuItem'}
                                        >   
                                            Music
                                        </Typography>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Grow>
                    </Popover>
                    <Tooltip
                        title={'User options'}
                        className={'hidden'}
                    >
                        <IconButton
                            onClick={handleUserInfoMenuToggle}
                            aria-controls={userInfoOpen ? 'userOptions' : undefined}
                            aria-haspopup={'true'}
                            className={'hidden'}
                            ref={anchorUserInfoRef}
                        >
                            <AccountCircleIcon 
                                className={'hidden'}
                        />
                        </IconButton>
                    </Tooltip>
                    <Popover
                        open={userInfoOpen}
                        anchorEl={anchorUserInfoRef.current}
                        role={undefined}
                        disablePortal
                        className={'headerPopover'}
                    >
                        <Grow>
                            <ClickAwayListener 
                                onClickAway={handleUserInfoMenuClose}>
                                <MenuList
                                    id={'userOptions'}
                                    autoFocusItem={userInfoOpen}
                                    onKeyDown={handleUserListKeyDown}
                                >
                                    <MenuItem
                                        onClick={handleUserInfoMenuClose}
                                    >
                                        <PermIdentityIcon />
                                        <Typography
                                            className={'menuItem'}
                                        >
                                            My profile
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleUserInfoMenuClose}
                                    >
                                        <VpnKeyIcon />
                                        <Typography
                                            className={'menuItem'}
                                        >
                                            Change password
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleUserInfoMenuClose}
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
                    </Popover>

                </div>
            </AppBar>
            <DialogForInsertOrUpdate
                key={'dialogForInsert'}
                openDialogForInsertOrUpdate={openDialogForInsertOrUpdate}
                passedInsertType={passedInsertType}
                toggleOpenDialogForInsertOrUpdate={toggleOpenDialogForInsertOrUpdate}
                forUpdate={false}
            />
            <DescriptionDialog 
                openDescriptionDialog={openDescriptionDialog}
                toggleOpenDescriptionDialog={toggleOpenDescriptionDialog}
            />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return{
        artsFavoriteNumber: state.artReducer.artsFavoriteNumber,
        arts: state.artReducer.arts
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        toogleLookingAtFavoritesOnly: bindActionCreators(toogleLookingAtFavoritesOnly, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (HeaderContainer);