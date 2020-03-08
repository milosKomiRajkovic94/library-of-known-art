import React  from 'react';

import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';

import DialogContent from '@material-ui/core/DialogContent';

import DialogActions from '@material-ui/core/DialogActions';

import LinkedInIcon from '@material-ui/icons/LinkedIn';

import MailIcon from '@material-ui/icons/Mail';

import GitHubIcon from '@material-ui/icons/GitHub';

import IconButton from '@material-ui/core/IconButton';

const DescriptionDialog = ({openDescriptionDialog, toggleOpenDescriptionDialog}) => {


    return(
        <Dialog
            open={openDescriptionDialog}
            className={'singleCardDeletionDialog descriptionDialog'}
            onClose={toggleOpenDescriptionDialog}
        >
            <DialogTitle 
                className={'titleOfDialogForInsertOrUpdate descriptionDialog'}
            >
                Description of app
            </DialogTitle>
            <DialogContent>
                <p>
                    This app represents showcase of my knowledge in working with newest version of React (version: ^16.13.0") and Redux (version: ^4.0.5), together with @material-ui packages 
                    and other side technologies (SASS, JavaScript, HTML, CSS, Node.js etc.) while implementing complicated CRUD functionalities shown in static app using fake JSON data.
                </p>
                <div
                    className={'descriptionCopyRights'}
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
                    </div>
            </DialogContent>
            <DialogActions
                className={'yesButton okButton'}
                onClick={toggleOpenDescriptionDialog}
            >
                Ok
            </DialogActions>

        </Dialog>
    )

}

export default DescriptionDialog;