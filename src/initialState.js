import {arts} from './resources/data';

export default {
    artReducerState: {
        arts: [...arts],
        artsFavoriteNumber: arts.filter(o => o.favorite === true).length,
        typeCriteria: '',
        artsCriteriaArray: [],
        lookOnlyAtFavorite: false,
        artsFavorite: [],
        updateRefreshed: false,
        toggledFavoriteDone: false,
        insertRefreshed: false
    }
}