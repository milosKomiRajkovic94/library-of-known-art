import React, {useState, useEffect} from 'react';

import Pagination from '@material-ui/lab/Pagination';

import SingleCard from '../../utils/SingleCard';

import {bindActionCreators} from 'redux';

import {changeRatingOfTheArt, updateRefreshedToggle} from '../../actions/artActions';

import {connect} from 'react-redux';

const HomePageCardCarouselContainer = ({arts, changeRatingOfTheArt, typeCriteria, lookOnlyAtFavorite, artsCriteriaArray, artsFavorite, updateRefreshedToggle, updateRefreshed}) => {

    var [subArrayOfArts, setSubArrayOfArts] = useState([arts[0], arts[1], arts[2]]),
        [localTypeCriteria, setLocalTypeCriteria] = useState(''),
        [arrayLength, setArrayLength] = useState(arts.length),
        [currentPage, setCurrentPage] = useState(1),
        [lookOnlyAtFavoriteLocally, setLookOnlyAtFavoriteLocally] = useState(false);

    function changeCurrentRating(event, id){
        setSubArrayOfArts(subArrayOfArts.map(el => (el.id === id ? Object.assign({}, el, { ratings: event.target.value}) : el)));

        changeRatingOfTheArt(event.target.value, id, arts);
    }

    useEffect(() => {
        var arrayToPass = [];

        if(updateRefreshed){
            if(lookOnlyAtFavoriteLocally){
                if(artsFavorite[0]){
                    arrayToPass.push(artsFavorite[0]);
                }
                
                if(artsFavorite[1]){
                    arrayToPass.push(artsFavorite[1]);
                }
                
                if(artsFavorite[2]){
                    arrayToPass.push(artsFavorite[2]);
                }

                setSubArrayOfArts(arrayToPass);
                setLocalTypeCriteria(typeCriteria);
                setArrayLength(artsFavorite.length);
                setCurrentPage(1);
                updateRefreshedToggle(false);
            }else{
                if(arts[0]){
                    arrayToPass.push(arts[0]);
                }
                
                if(arts[1]){
                    arrayToPass.push(arts[1]);
                }
                
                if(arts[2]){
                    arrayToPass.push(arts[2]);
                }

                setSubArrayOfArts(arrayToPass);
                setLocalTypeCriteria(typeCriteria);
                setArrayLength(arts.length);
                setCurrentPage(1);
                updateRefreshedToggle(false);
            }
        }else{
            if(lookOnlyAtFavoriteLocally !== lookOnlyAtFavorite){
                if(lookOnlyAtFavorite){
                    if(artsFavorite[0]){
                        arrayToPass.push(artsFavorite[0]);
                    }
        
                    if(artsFavorite[1]){
                        arrayToPass.push(artsFavorite[1]);
                    }
        
                    if(artsFavorite[2]){
                        arrayToPass.push(artsFavorite[2]); 
                    }
        
                    setSubArrayOfArts(arrayToPass);
                    setArrayLength(artsFavorite.length);
                    setLookOnlyAtFavoriteLocally(lookOnlyAtFavorite);
                }else{
                    if(arts[0]){
                        arrayToPass.push(arts[0]);
                    }
        
                    if(arts[1]){
                        arrayToPass.push(arts[1]);
                    }
        
                    if(arts[2]){
                        arrayToPass.push(arts[2]); 
                    }
        
                    setSubArrayOfArts(arrayToPass);
                    setArrayLength(arts.length);
                    setLookOnlyAtFavoriteLocally(lookOnlyAtFavorite);
                }
            }else{
                if(typeCriteria){
                    if(localTypeCriteria !== typeCriteria){
                        if(artsCriteriaArray[0]){
                            arrayToPass.push(artsCriteriaArray[0]);
                        }
                        
                        if(artsCriteriaArray[1]){
                            arrayToPass.push(artsCriteriaArray[1]);
                        }
                        
                        if(artsCriteriaArray[2]){
                            arrayToPass.push(artsCriteriaArray[2]);
                        }
                        setSubArrayOfArts(arrayToPass);
                        setLocalTypeCriteria(typeCriteria);
                        setArrayLength(artsCriteriaArray.length);
                        setCurrentPage(1);
                    }
                }else{
                    if(lookOnlyAtFavoriteLocally === false){
                        if(arts[0]){
                            arrayToPass.push(arts[0]);
                        }
                        
                        if(arts[1]){
                            arrayToPass.push(arts[1]);
                        }
                        
                        if(arts[2]){
                            arrayToPass.push(arts[2]);
                        }
        
                        setSubArrayOfArts(arrayToPass);
                        setLocalTypeCriteria(typeCriteria);
                        setArrayLength(arts.length);
                        setCurrentPage(1);
                    }else{
                        if(artsFavorite[0]){
                            arrayToPass.push(artsFavorite[0]);
                        }
                        
                        if(artsFavorite[1]){
                            arrayToPass.push(artsFavorite[1]);
                        }
                        
                        if(artsFavorite[2]){
                            arrayToPass.push(artsFavorite[2]);
                        }
        
                        setSubArrayOfArts(arrayToPass);
                        setLocalTypeCriteria(typeCriteria);
                        setArrayLength(artsFavorite.length);
                        setCurrentPage(1);
                    }

                }
            }
        }
    }, [arts, localTypeCriteria, typeCriteria, artsCriteriaArray, lookOnlyAtFavorite, lookOnlyAtFavoriteLocally, artsFavorite, updateRefreshed, updateRefreshedToggle] )

    function onChange(e, value){
        e.preventDefault();

        //console.log('On change', value);
        var subArrayOfArts = [],
            endValue = (value - 1) * 3;

        if(localTypeCriteria){
            if(lookOnlyAtFavoriteLocally){
                if(artsFavorite[endValue]){
                    subArrayOfArts.push(artsFavorite[endValue]);
                }
                
                if(artsFavorite[endValue + 1]){
                    subArrayOfArts.push(artsFavorite[endValue + 1]);
                }
                
                if(artsFavorite[endValue + 2]){
                    subArrayOfArts.push(artsFavorite[endValue + 2]);
                }
            }else{
                if(artsCriteriaArray[endValue]){
                    subArrayOfArts.push(artsCriteriaArray[endValue]);
                }
                
                if(artsCriteriaArray[endValue + 1]){
                    subArrayOfArts.push(artsCriteriaArray[endValue + 1]);
                }
                
                if(artsCriteriaArray[endValue + 2]){
                    subArrayOfArts.push(artsCriteriaArray[endValue + 2]);
                }
            }
        }else{
            if(lookOnlyAtFavoriteLocally){
                if(artsFavorite[endValue]){
                    subArrayOfArts.push(artsFavorite[endValue]);
                }
                
                if(artsFavorite[endValue + 1]){
                    subArrayOfArts.push(artsFavorite[endValue + 1]);
                }
                
                if(artsFavorite[endValue + 2]){
                    subArrayOfArts.push(artsFavorite[endValue + 2]);
                }
            }else{
                if(arts[endValue]){
                    subArrayOfArts.push(arts[endValue]);
                }
                
                if(arts[endValue + 1]){
                    subArrayOfArts.push(arts[endValue + 1]);
                }
                
                if(arts[endValue + 2]){
                    subArrayOfArts.push(arts[endValue + 2]);
                }
            }

        }
        setSubArrayOfArts(subArrayOfArts);

        setCurrentPage(value);

    }

    return(
        <React.Fragment>
            <div
                className={'cardsSet'}
            >
                {subArrayOfArts.map((obj, index) => {
                    return(
                        <SingleCard
                            key={'singleCard' + obj.id + obj.name} 
                            obj={obj}
                            changeCurrentRating={changeCurrentRating}
                            index={index}
                            type={'pagination'}
                        />
                    )
                })}
            </div> 

            <Pagination 
                page={currentPage}
                className={'paginationComponent'}
                onChange={onChange}
                count={((arrayLength / 3) > (arrayLength/ 3).toFixed(0)) || ((arrayLength / 3) % 1 > 0.5) ? Math.floor((arrayLength / 3) + 1) : Math.floor(arrayLength / 3)} />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return{
        typeCriteria: state.artReducer.typeCriteria,
        artsCriteriaArray: state.artReducer.artsCriteriaArray,
        artsFavorite: state.artReducer.artsFavorite,
        lookOnlyAtFavorite: state.artReducer.lookOnlyAtFavorite,
        updateRefreshed: state.artReducer.updateRefreshed
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        changeRatingOfTheArt: bindActionCreators(changeRatingOfTheArt, dispatch),
        updateRefreshedToggle: bindActionCreators(updateRefreshedToggle, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePageCardCarouselContainer);