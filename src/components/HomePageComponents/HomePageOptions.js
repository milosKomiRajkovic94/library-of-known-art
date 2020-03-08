import React from 'react';

import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import Autocomplete from '@material-ui/lab/Autocomplete';

import SyncAltTwoToneIcon from '@material-ui/icons/SyncAltTwoTone';

import AppsTwoToneIcon from '@material-ui/icons/AppsTwoTone';

import TextField from '@material-ui/core/TextField';

import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';

import MovieFilterTwoToneIcon from '@material-ui/icons/MovieFilterTwoTone';

import PanoramaTwoToneIcon from '@material-ui/icons/PanoramaTwoTone';

import MusicNoteTwoToneIcon from '@material-ui/icons/MusicNoteTwoTone';

import {typesOfArt} from '../../resources/data'

import {bindActionCreators} from 'redux';

import {changeTypeCriteria} from '../../actions/artActions';

import {connect} from 'react-redux';

import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'

import Tooltip from '@material-ui/core/Tooltip';

const HomePageOptions = ({setUseCarousel, arts, changeTypeCriteria, artsFavorite, lookOnlyAtFavorite, updateRefreshed}) => {

    var typeComboBoxRef = React.useRef(null);

    function onChangeTypeComboBox(e, value){
        if(lookOnlyAtFavorite){
            if(value !== null){
                changeTypeCriteria(artsFavorite, value.type);
            }else{
                changeTypeCriteria(artsFavorite, '');
            }
        }else{
            if(value !== null){
                changeTypeCriteria(arts, value.type);
            }else{
                changeTypeCriteria(arts, '');
            }
        }
    }

    return(
        <div
            className={'homePageOptionsTitle'}
        >
            <div
                className={lookOnlyAtFavorite ? 'favoriteHomePageOptionsTitle' : 'hidden'}
            >
                <FavoriteTwoToneIcon 
                    className={'sidebarIcon'}
                />
                <Typography
                    variant={'h6'}
                >
                    Overview of favorites
                </Typography>
            </div> 
            <div
                className={'homePageOptions'}
            >
                <div
                    className={'homePageViewOption'}
                >
                    <Typography
                        variant={'h6'}
                    >
                        View: 
                    </Typography>
                    <Tooltip
                        title={'In form of a pagination'}
                    >
                        <IconButton
                            onClick={() => setUseCarousel(true)}
                        >
                            <SyncAltTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title={'In form of a grid'}
                    >
                        <IconButton
                            onClick={() => setUseCarousel(false)}
                        >
                            <AppsTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div
                    className={'homePageViewOption homePageViewOptionComboBox'}
                >
                    <Typography
                        variant={'h6'}
                        className={'labelOfTypeOfArt'}
                    >
                        Type of art: 
                    </Typography>
                    <Autocomplete
                        key={'autoComplete' + lookOnlyAtFavorite + updateRefreshed}
                        options={typesOfArt}
                        ref={typeComboBoxRef}
                        getOptionLabel={option => option.title}
                        onChange={(e, value) => onChangeTypeComboBox(e, value)}
                        renderOption={option => {
                            var IconComponent = null;

                            if(option.type === 'music'){
                                IconComponent = MusicNoteTwoToneIcon;
                            }else if(option.type === 'book'){
                                IconComponent = MenuBookTwoToneIcon;
                            }else if(option.type === 'picture'){
                                IconComponent = PanoramaTwoToneIcon;
                            }else if(option.type === 'movie'){
                                IconComponent = MovieFilterTwoToneIcon;
                            }

                            return(
                                <React.Fragment>
                                    <IconComponent className={'iconComboBox'}/>
                                    {option.title}
                                </React.Fragment>
                            )
                        }}
                        className={'typesOfArtComboBox'}
                        renderInput={params => <TextField {...params} variant={'outlined'} />}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        arts: state.artReducer.arts,
        artsFavorite: state.artReducer.artsFavorite,
        lookOnlyAtFavorite: state.artReducer.lookOnlyAtFavorite,
        updateRefreshed: state.artReducer.updateRefreshed
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        changeTypeCriteria: bindActionCreators(changeTypeCriteria, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePageOptions);