import initialState from '../initialState';

import {CHANGED_RATING_OF_THE_ART, 
        TOGGLE_FAVORITE_HEART_OF_THE_ART, 
        CHANGED_TYPE_CRITERIA, 
        TOGGLE_LOOKING_AT_FAVORITES,
        DELETE_SINGLE_ART,
        UPDATE_SINGLE_ART,
        UPDATE_REFRESHED,
        TOGGLED_FAVORITE,
        INSERT_SINGLE_ART,
        INSERT_REFRESHED,
        RESET_CERTAIN_DATA} from '../actions/actionTypes';

export function artReducer(state = initialState.artReducerState, action){
    switch(action.type){
        case CHANGED_RATING_OF_THE_ART: {
            return Object.assign({}, state, {arts: action.arts});
        }
        case TOGGLE_FAVORITE_HEART_OF_THE_ART: {
            return Object.assign({}, state, {arts: action.arts, artsFavoriteNumber: action.artsFavoriteNumber, toggledFavoriteDone: true});
        }
        case CHANGED_TYPE_CRITERIA: {
            return Object.assign({}, state, { artsCriteriaArray: action.artsCriteriaArray, typeCriteria: action.typeCriteria});
        }
        case TOGGLE_LOOKING_AT_FAVORITES: {
            return Object.assign({}, state, {lookOnlyAtFavorite: action.lookOnlyAtFavorite, artsFavorite: action.artsFavorite, typeCriteria: ''});
        }
        case DELETE_SINGLE_ART: {
            return Object.assign({}, state, {arts: action.arts, artsFavorite: action.artsFavorite, artsFavoriteNumber: action.artsFavoriteNumber});
        }

        case UPDATE_SINGLE_ART: {
            return Object.assign({}, state, {arts: action.arts, artsFavorite: action.artsFavorite, typeCriteria: '', updateRefreshed: true});
        }

        case UPDATE_REFRESHED: {
            return Object.assign({}, state, {updateRefreshed: action.updateRefreshed});
        }

        case TOGGLED_FAVORITE: {
            return Object.assign({}, state, {toggledFavoriteDone: action.toggledFavoriteDone})
        }

        case INSERT_SINGLE_ART: {
            return Object.assign({}, state, {arts: action.arts, insertRefreshed: true, lookOnlyAtFavorite: false, typeCriteria: ''})
        }

        case INSERT_REFRESHED: {
            return Object.assign({}, state, {insertRefreshed: action.insertRefreshed})
        }

        case RESET_CERTAIN_DATA: {
            return Object.assign({}, state, {typeCriteria: '', artsFavorite: [], updateRefreshed: false, insertRefreshed: false, lookOnlyAtFavorite: false, toggledFavoriteDone: false, artsCriteriaArray: []})
        }

        default: {
            return state;
        }   
    }
}