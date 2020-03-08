import { 
    CHANGED_RATING_OF_THE_ART, 
    TOGGLE_FAVORITE_HEART_OF_THE_ART, 
    CHANGED_TYPE_CRITERIA, 
    TOGGLE_LOOKING_AT_FAVORITES,
    DELETE_SINGLE_ART,
    UPDATE_SINGLE_ART,
    UPDATE_REFRESHED,
    TOGGLED_FAVORITE,
    INSERT_SINGLE_ART,
    INSERT_REFRESHED,
    RESET_CERTAIN_DATA
 } from './actionTypes';

function changedRatingsOfTheArt(arts){
    console.log("Ratings changed", arts);
    return{
        type: CHANGED_RATING_OF_THE_ART,
        arts
    }
}

export function changeRatingOfTheArt(value, id, arts){
    return(dispatch) => {
        var index = arts.findIndex(o => o.id === id);
        arts[index].ratings = Number(value);
        dispatch(changedRatingsOfTheArt(arts));
    }
}

function toggledRatingsOfTheArt(arts, artsFavoriteNumber){
    return{
        type: TOGGLE_FAVORITE_HEART_OF_THE_ART,
        arts,
        artsFavoriteNumber
    }
}

export function toggleRatingsOfTheArt(arts, id){
    return(dispatch) => {
        var index = arts.findIndex(o => o.id === id);
        arts[index].favorite = !arts[index].favorite;
        var artsFavoriteNumber = arts.filter(o => o.favorite === true).length;
        dispatch(toggledRatingsOfTheArt(arts, artsFavoriteNumber));
    }
}

function changedTypeCriteria(artsCriteriaArray, typeCriteria){
    return{
        type: CHANGED_TYPE_CRITERIA,
        artsCriteriaArray,
        typeCriteria
    }
}

export function changeTypeCriteria(arts, typeCriteria){
    return(dispatch) => {
        if(typeCriteria){
            var finalArray = arts.filter(o => o.type === typeCriteria);
            dispatch(changedTypeCriteria(finalArray, typeCriteria));
        }else{
            dispatch(changedTypeCriteria([], typeCriteria));
        }
    }
}

export function toggledFavoriteFinished(toggledFavoriteDone){
    return{
        type: TOGGLED_FAVORITE,
        toggledFavoriteDone
    }
}

function toggledLookingAtFavoritesOnly(lookOnlyAtFavorite, artsFavorite){
    return{
        type: TOGGLE_LOOKING_AT_FAVORITES,
        lookOnlyAtFavorite,
        artsFavorite
    }
}

export function toogleLookingAtFavoritesOnly(arts, lookOnlyAtFavorite){
    return(dispatch) => {
        if(lookOnlyAtFavorite){
            dispatch(toggledLookingAtFavoritesOnly(lookOnlyAtFavorite, arts.filter(o => o.favorite === true)));
        }else{
            dispatch(toggledLookingAtFavoritesOnly(lookOnlyAtFavorite, []));
        }
    }
}

function deletedSingleArt(arts, artsFavorite, artsFavoriteNumber){
    return{
        type: DELETE_SINGLE_ART,
        arts,
        artsFavorite,
        artsFavoriteNumber
    }
}

export function deleteSingleArt(id, arts){
    return(dispatch) => {
        var shortenArray = []; 

        arts.forEach((obj) => {
            if(obj.id !== id){
                shortenArray.push(obj);
            }
        });

        dispatch(deletedSingleArt(shortenArray, shortenArray.filter(o => o.favorite === true), shortenArray.filter(o => o.favorite === true).length));
    }
}

function updatedSingleArt(arts, artsFavorite){
    return{
        type: UPDATE_SINGLE_ART,
        arts,
        artsFavorite 
    }
}

export function updateSingleArt(obj, arts){
    return(dispatch) => {
        var findIndex = arts.findIndex(o => o.id === obj.id); 
        arts[findIndex] = obj;

        var artsFavorite = arts.filter(o => o.favorite === true); 

        dispatch(updatedSingleArt(arts, artsFavorite));
    }
}

export function updateRefreshedToggle(updateRefreshed){
    return{
        type: UPDATE_REFRESHED,
        updateRefreshed
    }
}


export function toggleInsertRefreshed(insertRefreshed){
    return{
        type: INSERT_REFRESHED,
        insertRefreshed
    }
}

function insertionDone(arts){
    return{
        type: INSERT_SINGLE_ART,
        arts
    }
}

export function insertSingleArt(obj, arts){
    return(dispatch) => {
        arts.push(obj); 
        dispatch(insertionDone(arts));
    }
}

export function resetCertainData(){
    return{
        type: RESET_CERTAIN_DATA
    }
}