import React from 'react';

import LinkedInIcon from '@material-ui/icons/LinkedIn';

import MailIcon from '@material-ui/icons/Mail';

import GitHubIcon from '@material-ui/icons/GitHub';

import IconButton from '@material-ui/core/IconButton';

const FooterContainer = () => {
    return(
        <footer
            className={'footerContainer'}
        >
            <div
                className={'copyRightsLabel'}
            >
                {'\u00A9'} 2020 Miloš Rajković All Rights Reserved
            </div>
            <div
                className={'socialIcons'}
            >
                <IconButton
                    href={'https://www.linkedin.com/in/milo%C5%A1-rajkovi%C4%87-0587057a/'}
                    target={'_blank'}
                >
                    <LinkedInIcon 
                    />
                </IconButton>
                <IconButton
                    href={'mailto:rajkovicm94@gmail.com'}
                    target={'_blank'}
                >
                    <MailIcon 
                    />
                </IconButton>
                <IconButton
                    href={'https://github.com/milosKomiRajkovic94'}
                    target={'_blank'}
                >
                    <GitHubIcon 
                    />
                </IconButton>
            </div>
        </footer>
    )
}


export default FooterContainer;