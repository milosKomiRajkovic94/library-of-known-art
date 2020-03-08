import React, {useState, useEffect} from 'react';

import SingleCard from '../../utils/SingleCard';

import {bindActionCreators} from 'redux';

import {changeRatingOfTheArt} from '../../actions/artActions';

import {connect} from 'react-redux';


const HomePageCardGridContainer = ({arts, changeRatingOfTheArt, typeCriteria, lookOnlyAtFavorite, artsCriteriaArray, artsFavorite}) => {
    var [localTypeCriteria, setLocalTypeCriteria] = useState(''),
        [lookOnlyAtFavoriteLocally, setLookOnlyAtFavoriteLocally] = useState(false);


    function changeCurrentRating(event, id){
        changeRatingOfTheArt(event.target.value, id, arts);
    }

    function componentToReturn(obj, index){
        return(
            <div
                className={'singleCardContainer'}
                key={'singleCardContainer' + obj.id + obj.name + obj.ratings + 'grid'} 
            >
                <SingleCard
                    key={'singleCard' + obj.id + obj.name + obj.ratings + 'grid'} 
                    type={'grid'}
                    obj={obj}
                    changeCurrentRating={changeCurrentRating}
                    index={index}
                />
            </div>
        )
    }

    useEffect(() => {
        if(lookOnlyAtFavoriteLocally !== lookOnlyAtFavorite){
            setLookOnlyAtFavoriteLocally(lookOnlyAtFavorite);
        }else{
            setLocalTypeCriteria(typeCriteria);
        }
    }, [typeCriteria, lookOnlyAtFavorite, lookOnlyAtFavoriteLocally]);

    return(
        <div
            className={'cardsSet cardsSetGrid'}
        >
            {lookOnlyAtFavoriteLocally ?
                localTypeCriteria ?
                artsFavorite.filter(o => o.type === localTypeCriteria).map((obj, index) => {
                    return(
                        componentToReturn(obj, index)
                    )
                })
                :
                artsFavorite.map((obj, index) => {
                    return(
                        componentToReturn(obj, index)
                    )
                })
                :
                localTypeCriteria ?
                arts.filter(o => o.type === localTypeCriteria).map((obj, index) => {
                    return(
                        componentToReturn(obj, index)
                    )
                })
                :
                arts.map((obj, index) => {
                    return(
                        componentToReturn(obj, index)
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        typeCriteria: state.artReducer.typeCriteria,
        artsCriteriaArray: state.artReducer.artsCriteriaArray,
        artsFavorite: state.artReducer.artsFavorite,
        lookOnlyAtFavorite: state.artReducer.lookOnlyAtFavorite,
        arts: state.artReducer.arts
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        changeRatingOfTheArt: bindActionCreators(changeRatingOfTheArt, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePageCardGridContainer);