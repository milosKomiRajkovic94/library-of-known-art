import React, {useState} from 'react';

import HomePageOptions from './HomePageOptions';

import HomePageCardContainer from './HomePageCardContainer';

const HomePageContainer = () => {

    var [useCarousel, setUseCarousel] = useState(true);


    return(
        <div
            className={'homePageContainer'}
        >
            <HomePageOptions 
                setUseCarousel={setUseCarousel}
            />
            <HomePageCardContainer
                useCarousel={useCarousel}
            />
        </div>

    )

}

export default HomePageContainer;