import React from 'react';

import {connect} from 'react-redux';

import HomePageCardCarouselContainer from './HomePageCardCarouselContainer';

import HomePageCardGridContainer from './HomePageCardGridContainer';

const HomePageCardContainer = ({useCarousel, arts}) => {

    return(
        <div
            className={'homePageCardContainer'}
        >
            <div
                className={useCarousel ? 'cardCarouselContainer' : 'hidden'}
            >   
                {useCarousel && 
                    <HomePageCardCarouselContainer
                        arts={arts}
                    />
                }
            </div>
            <div
                className={useCarousel ? 'hidden' : 'cardGridContainer'}
            >
                {!useCarousel &&
                <HomePageCardGridContainer 
                    arts={arts}
                /> }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        arts: state.artReducer.arts
    }
}

export default connect(mapStateToProps) (HomePageCardContainer);