import React, {useState} from 'react';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';

import EditIcon from '@material-ui/icons/Edit';

import FavoriteIcon from '@material-ui/icons/Favorite';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import MenuBookIcon from '@material-ui/icons/MenuBook';

import MovieFilterIcon from '@material-ui/icons/MovieFilter';

import PanoramaIcon from '@material-ui/icons/Panorama';

import MusicNoteIcon from '@material-ui/icons/MusicNote';

import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';

import DeleteIcon from '@material-ui/icons/Delete';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {toggleRatingsOfTheArt, toogleLookingAtFavoritesOnly, deleteSingleArt} from '../actions/artActions'

import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';

import DialogContent from '@material-ui/core/DialogContent';

import DialogActions from '@material-ui/core/DialogActions'; 

import DialogContentText from '@material-ui/core/DialogContentText';

import Tooltip from '@material-ui/core/Tooltip';

import DialogForInsertOrUpdate from './DialogForInsertOrUpdate';

import { withSnackbar } from 'notistack';

const SingleCard = ({obj, enqueueSnackbar, changeCurrentRating, type, arts, toggleRatingsOfTheArt, lookOnlyAtFavorite, toogleLookingAtFavoritesOnly, deleteSingleArt}) => {

    var [openDeleteDialog, setOpenDeleteDialog] = useState(false),
        [ratingsValue, setRatingsValue] = useState(obj.ratings),
        [openDialogForInsertOrUpdate, setOpenDialogForInsertOrUpdate] = useState(false);

    function toggleOpenDialogForInsertOrUpdate(){
        setOpenDialogForInsertOrUpdate(prevOpenDialogForInsertOrUpdate => !prevOpenDialogForInsertOrUpdate)
    }

    function preChangeRating(event, id){
        setRatingsValue(event.target.value);
        changeCurrentRating(event, id);
    }

    function deleteSingleArtLocally(){
        enqueueSnackbar('Successful deleted art!', {
            variant: 'success'
        });
        setOpenDeleteDialog(false);
        deleteSingleArt(obj.id, arts);
    }

    function toggleOpeningDeleteDialog(){
        setOpenDeleteDialog(prevOpenDeleteDialog => !prevOpenDeleteDialog);
    }

    function toggleFavoriteIcon(){
        if(FavoriteToggleIcon === FavoriteIcon){
            setFavoriteToggleIcon(FavoriteBorderIcon);
        }else{
            setFavoriteToggleIcon(FavoriteIcon);
        }

        toggleRatingsOfTheArt(arts, obj.id);

        if(lookOnlyAtFavorite){
            toogleLookingAtFavoritesOnly(arts, lookOnlyAtFavorite);
        }
    }

    var IconComponent = null,
        authorLabel = '',
        genreLabel = 'Genre',
        [FavoriteToggleIcon, setFavoriteToggleIcon] = React.useState(obj.favorite ? FavoriteIcon : FavoriteBorderIcon);

    if(obj.type === 'book'){
        IconComponent = MenuBookIcon;
        authorLabel = 'Author';
    }else if(obj.type === 'movie'){
        IconComponent = MovieFilterIcon;
        authorLabel = 'Director';
    }else if(obj.type === 'picture'){
        IconComponent = PanoramaIcon;
        authorLabel = 'Painter';
        genreLabel = 'Theme';
    }else if(obj.type === 'music'){
        IconComponent = MusicNoteIcon;
        authorLabel = 'Musician';
    }

    return(
        <React.Fragment>
            <Card
                className={'singleCard'}
            >
                <Tooltip
                    title={obj.type.substring(0, 1).toUpperCase() + obj.type.slice(1)}
                >
                    <CardMedia>
                        <IconComponent />
                    </CardMedia>
                </Tooltip>
                <CardContent>
                    <Typography
                        variant={'h6'}
                        display={'block'}
                        className={'singleCardTitle'}
                    >
                        {obj.name}
                    </Typography>
                    <div
                        className={'artInformationTable'}
                    >
                        <div>
                            <span
                                className={'artInformation'}
                            >
                                <b
                                    className={'typeOfInformation'} 
                                > 
                                    {authorLabel + ":"}
                                </b>
                                <span
                                    className={'information'}
                                >
                                    {obj.author}
                                </span>
                            </span>
                            <span
                                className={'artInformation'}
                            >
                                <b
                                    className={'typeOfInformation'} 
                                > 
                                    {genreLabel + ':'}
                                </b>
                                <span
                                    className={'information'}
                                >
                                    {obj.genre}
                                </span>
                            </span>
                        </div>
                        <div>
                            <span
                                className={'artInformation'}
                            >
                                <b
                                    className={'typeOfInformation'} 
                                > 
                                    Release date:
                                </b>
                                <span
                                    className={'information'}
                                >
                                    {obj.releaseDate}
                                </span>
                            </span>
                            <span
                                className={'artInformation'}
                            >
                                <b
                                    className={'typeOfInformation'} 
                                > 
                                    Rating:
                                </b>
                                <Rating
                                    id={'rating' + obj.id + type}
                                    className={'ratingStars'}
                                    value={Number(ratingsValue)}
                                    precision={0.1}
                                    name={'starRating' + obj.id + type}
                                    onChange={(event) => preChangeRating(event, obj.id)}
                                />
                            </span>
                        </div>
                    </div>

                </CardContent>
                <CardActionArea
                    className={'cardActionArea'}
                    disableRipple
                    disableTouchRipple
                >
                    <CardActions
                        className={'singleCardAction singleCardActionFavorite'}
                        onClick={() => toggleFavoriteIcon()}
                    >
                        <FavoriteToggleIcon 
                            color={'action'}
                        />
                    </CardActions>
                    <CardActions
                        className={'singleCardAction'}
                        onClick={toggleOpenDialogForInsertOrUpdate}
                    >
                        <EditIcon />
                    </CardActions>
                    <CardActions
                        onClick={toggleOpeningDeleteDialog}
                    >
                        <DeleteIcon />
                    </CardActions>
                </CardActionArea>
            </Card>
            <Dialog
                open={openDeleteDialog}
                onClose={toggleOpeningDeleteDialog}
                className={'singleCardDeletionDialog'}
                style={{zIndex: '1000000px'}}
            >
                <DialogTitle
                    className={'singleCardDeletionDialogTitle'}
                >
                    Delete art? 
                </DialogTitle>
                <DialogContent
                    className={'singleCardDeletionDialogContent'}
                >
                    <DialogContentText
                        className={'singleCardDeletionDialogContentText'}
                    >
                        Are you sure you want to delete art?
                    </DialogContentText>
                </DialogContent>
                <div
                    className={'singleCardActionButtons'}
                >
                    <DialogActions
                        className={'yesButton'}
                        onClick={deleteSingleArtLocally}

                    >
                        Yes, delete it 
                    </DialogActions>
                    <DialogActions
                        className={'noButton'}
                        onClick={toggleOpeningDeleteDialog}
                    >
                        No, cancel
                    </DialogActions>
                </div>
            </Dialog>
            <DialogForInsertOrUpdate
                key={'dialogForUpdate' + obj.id + obj.name}
                openDialogForInsertOrUpdate={openDialogForInsertOrUpdate}
                toggleOpenDialogForInsertOrUpdate={toggleOpenDialogForInsertOrUpdate}
                forUpdate={true}
                obj={obj}
            />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return{
        arts: state.artReducer.arts,
        lookOnlyAtFavorite: state.artReducer.lookOnlyAtFavorite
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        toggleRatingsOfTheArt: bindActionCreators(toggleRatingsOfTheArt, dispatch),
        toogleLookingAtFavoritesOnly:  bindActionCreators(toogleLookingAtFavoritesOnly, dispatch),
        deleteSingleArt: bindActionCreators(deleteSingleArt, dispatch)
    }
}

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps) (SingleCard));