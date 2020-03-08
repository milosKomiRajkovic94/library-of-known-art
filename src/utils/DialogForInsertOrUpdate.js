import 'date-fns';

import React, {useState, useEffect} from 'react';

import TextField from '@material-ui/core/TextField';

import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';

import DialogContent from '@material-ui/core/DialogContent';

import DialogActions from '@material-ui/core/DialogActions';

import Autocomplete from '@material-ui/lab/Autocomplete';

import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';

import MovieFilterTwoToneIcon from '@material-ui/icons/MovieFilterTwoTone';

import PanoramaTwoToneIcon from '@material-ui/icons/PanoramaTwoTone';

import MusicNoteTwoToneIcon from '@material-ui/icons/MusicNoteTwoTone';

import {typesOfArt} from '../resources/data';

import {updateSingleArt, toggledFavoriteFinished, insertSingleArt} from '../actions/artActions';

import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';

import { withSnackbar } from 'notistack';

const DialogForInsertOrUpdate = ({arts, enqueueSnackbar, passedInsertType, toggledFavoriteDone, insertSingleArt, toggledFavoriteFinished, openDialogForInsertOrUpdate, toggleOpenDialogForInsertOrUpdate, forUpdate, obj, updateSingleArt}) => {

    var dateArray = obj ? obj.releaseDate.split('/') : undefined,
        todaysDate = new Date(),
        type = obj ? String(obj.type) : passedInsertType,
        [currentType, setCurrentType] = useState(obj ? {title: type.substring(0, 1).toUpperCase() + type.slice(1), type: obj.type} : {title: type.substring(0, 1).toUpperCase() + type.slice(1), type: type}),
        [dateValue, setDateValue] = useState(obj ? new Date(dateArray[2],  dateArray[1] - 1, dateArray[0]) : todaysDate),
        [startedObject, setStartedObject] = useState(obj ? {
            id: obj['id'],
            name: obj['name'],
            author: obj['author'],
            genre: obj['genre'],
            releaseDate: obj['releaseDate'],
            type: obj['type'],
            favorite: obj['favorite'],
            ratings: obj['ratings']
        } : {
            id: arts.length + 2,
            name: '',
            author: '',
            genre: '',
            releaseDate: '', 
            type: '',
            favorite: false,
            ratings: 0
        });

    useEffect(() => {

        if(toggledFavoriteDone && obj){
            startedObject['favorite'] = obj['favorite'];

            setStartedObject(startedObject);
            toggledFavoriteFinished(false);
        }

        if(passedInsertType && (!startedObject['type'] || !startedObject['releaseDate'])){
            setCurrentType({title: passedInsertType.substring(0, 1).toUpperCase() + passedInsertType.slice(1), type: passedInsertType})
            startedObject['type'] = passedInsertType;
            startedObject['releaseDate'] = todaysDate.getUTCDate() + "/" + String(Number((todaysDate.getUTCMonth() + 1))) + "/" + todaysDate.getUTCFullYear()
            setStartedObject(startedObject);
        }

    }, [toggledFavoriteDone, obj, toggledFavoriteFinished, startedObject, passedInsertType, todaysDate])

    function insertSingleArtLocally(){
        enqueueSnackbar('Successful added art!', {
            variant: 'success'
        });


        startedObject['favorite'] = false;
        startedObject['ratings'] = 0;

        insertSingleArt(startedObject, arts);

        toggleOpenDialogForInsertOrUpdate();

        setStartedObject({
            id: startedObject.id + 1,
            name: '',
            author: '',
            genre: '',
            releaseDate: '', 
            type: '',
            favorite: false,
            rating: 0
        })
    }

    function updateSingleArtLocally(){
        
        enqueueSnackbar('Successful updated art!', {
            variant: 'success'
        });

        startedObject['releaseDate'] = dateValue.getDate() + "/" + String(Number(dateValue.getMonth() + 1)) + "/" + dateValue.getFullYear();

        updateSingleArt(startedObject, arts);

        toggleOpenDialogForInsertOrUpdate();
    }

    function handleChange(name, value){
        startedObject[name] = value;

        setStartedObject(startedObject);
    }

    function onChangeDateHandler(e){
        var theWholeDate = e,
            month = theWholeDate.getUTCMonth() + 1,
            day = theWholeDate.getUTCDate(),
            year = theWholeDate.getUTCFullYear(),
            currentDate = dateValue,
            currentMonth = currentDate.getMonth() + 1,
            stringDate = currentMonth === month ? day + "/" + month + "/" + year : (day + 1) + "/" + month + "/" + year;

        handleChange('releaseDate', stringDate);
        
        setDateValue(e);
    }

    function changeCurrentType(event, value){
        setCurrentType(value ? value : null);
        handleChange('type', value ? value.type : '');
    }

    if(forUpdate){
        return(
            <Dialog 
                className={'singleCardDeletionDialog dialogForInsertOrUpdate'}
                onClose={toggleOpenDialogForInsertOrUpdate}
                open={openDialogForInsertOrUpdate}
            >
                <DialogTitle
                    className={'titleOfDialogForInsertOrUpdate'}
                >
                    Update art                   
                </DialogTitle> 
                <DialogContent
                    className={'contentOfDialogForInsertOrUpdate'}
                >
                        <TextField 
                            label={'Name: '} 
                            variant={'outlined'} 
                            defaultValue={obj.name} 
                            name={'name'}
                            className={'formGroupField'}
                            onChange={(event) => handleChange(event.target.name, event.target.value)}
                        />
                        <TextField 
                            label={'Author: '} 
                            variant={'outlined'} 
                            defaultValue={obj.author} 
                            name={'author'}
                            className={'formGroupField'}
                            onChange={(event) => handleChange(event.target.name, event.target.value)}
                        />
                        <TextField 
                            label={currentType.type === 'picture' ? 'Theme:' : 'Genre:'} 
                            variant={'outlined'} 
                            defaultValue={obj.genre} 
                            name={'genre'}
                            className={'formGroupField'}
                            onChange={(event) => handleChange(event.target.name, event.target.value)}
                        />
                        <MuiPickersUtilsProvider 
                            utils={DateFnsUtils}
                            key={'muiPickersUtilsProvider' + obj.id + obj.name}
                        >
                            <KeyboardDatePicker
                                key={'keyBoardPicker' + obj.id + obj.name}
                                label={'Release date: '}
                                format={'dd/MM/yyyy'}
                                name={'releaseDate'}
                                value={dateValue ? dateValue : undefined} 
                                variant={'outlined'}
                                onChange={(e) => onChangeDateHandler(e)}
                                className={'formGroupField'}
                                minDate={new Date('1000-01-01T00:00:00')}
                            />
                        </MuiPickersUtilsProvider>
                        <Autocomplete
                            options={typesOfArt}
                            getOptionLabel={option => option.title}
                            onChange={changeCurrentType}
                            name={'type'}
                            className={'formGroupField'}
                            disableClearable
                            value={currentType}
                            renderOption={option => {
                                var IconComponent = null;

                                if(option.type === 'music'){
                                    IconComponent = MusicNoteTwoToneIcon;
                                }else if(option.type === 'book'){
                                    IconComponent = MenuBookTwoToneIcon;
                                }else if(option.type === 'picture'){
                                    IconComponent = PanoramaTwoToneIcon;
                                }else if(option.type === 'movie'){
                                    IconComponent = MovieFilterTwoToneIcon;
                                }

                                return(
                                    <React.Fragment>
                                        <IconComponent className={'iconComboBox'}/>
                                        {option.title}
                                    </React.Fragment>
                                )
                            }}
                            renderInput={params => <TextField {...params} label={'Type of art: '} variant={'outlined'} />}
                        />
                </DialogContent>
                <div
                    className={'singleCardActionButtons'}
                >
                    <DialogActions
                        className={'yesButton'}
                        onClick={updateSingleArtLocally}

                    >
                        Yes, update it 
                    </DialogActions>
                    <DialogActions
                        className={'noButton'}
                        onClick={() => {toggleOpenDialogForInsertOrUpdate(); setDateValue(new Date(dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0] + "T01:00:00")); }}
                    >
                        No, cancel
                    </DialogActions>
                </div>
            </Dialog>
        )
    }else{

        return(
            <Dialog 
                className={'singleCardDeletionDialog dialogForInsertOrUpdate'}
                onClose={toggleOpenDialogForInsertOrUpdate}
                open={openDialogForInsertOrUpdate}
            >
                <DialogTitle
                    className={'titleOfDialogForInsertOrUpdate'}
                >
                    Add new  {currentType.title}               
                </DialogTitle> 
                <DialogContent
                    className={'contentOfDialogForInsertOrUpdate'}
                >
                        <TextField 
                            label={'Name: '} 
                            variant={'outlined'} 
                            name={'name'}
                            className={'formGroupField'}
                            onChange={(event) => handleChange(event.target.name, event.target.value)}
                        />
                        <TextField 
                            label={'Author: '} 
                            variant={'outlined'} 
                            name={'author'}
                            className={'formGroupField'}
                            onChange={(event) => handleChange(event.target.name, event.target.value)}
                        />
                        <TextField 
                            label={currentType.type === 'picture' ? 'Theme:' : 'Genre:'} 
                            variant={'outlined'} 
                            name={'genre'}
                            className={'formGroupField'}
                            onChange={(event) => handleChange(event.target.name, event.target.value)}
                        />
                        <MuiPickersUtilsProvider 
                            utils={DateFnsUtils}
                            key={'muiPickersUtilsProviderInsert'}
                        >
                            <KeyboardDatePicker
                                key={'keyBoardPickerInsert'}
                                label={'Release date: '}
                                format={'dd/MM/yyyy'}
                                name={'releaseDate'}
                                value={dateValue ? dateValue : undefined} 
                                variant={'outlined'}
                                onChange={(e) => onChangeDateHandler(e)}
                                className={'formGroupField'}
                                minDate={new Date('1000-01-01T00:00:00')}
                            />
                        </MuiPickersUtilsProvider>
                        <Autocomplete
                            options={typesOfArt}
                            getOptionLabel={option => option.title}
                            onChange={changeCurrentType}
                            name={'type'}
                            className={'formGroupField'}
                            disableClearable
                            value={currentType}
                            renderOption={option => {
                                var IconComponent = null;

                                if(option.type === 'music'){
                                    IconComponent = MusicNoteTwoToneIcon;
                                }else if(option.type === 'book'){
                                    IconComponent = MenuBookTwoToneIcon;
                                }else if(option.type === 'picture'){
                                    IconComponent = PanoramaTwoToneIcon;
                                }else if(option.type === 'movie'){
                                    IconComponent = MovieFilterTwoToneIcon;
                                }

                                return(
                                    <React.Fragment>
                                        <IconComponent className={'iconComboBox'}/>
                                        {option.title}
                                    </React.Fragment>
                                )
                            }}
                            renderInput={params => <TextField {...params} label={'Type of art: '} variant={'outlined'} />}
                        />
                </DialogContent>
                <div
                    className={'singleCardActionButtons'}
                >
                    <DialogActions
                        className={'yesButton'}
                        onClick={insertSingleArtLocally}

                    >
                        Yes, insert it 
                    </DialogActions>
                    <DialogActions
                        className={'noButton'}
                        onClick={() => {toggleOpenDialogForInsertOrUpdate(); setStartedObject({
                            id: arts.length + 2,
                            name: '',
                            author: '',
                            genre: '',
                            releaseDate: '', 
                            type: '',
                            favorite: false,
                            ratings: 0
                        })}}
                    >
                        No, cancel
                    </DialogActions>
                </div>
            </Dialog>
        )
    }

}

const mapStateToProps = (state) => {
    return{
        arts: state.artReducer.arts,
        toggledFavoriteDone: state.artReducer.toggledFavoriteDone
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateSingleArt: bindActionCreators(updateSingleArt, dispatch),
        toggledFavoriteFinished: bindActionCreators(toggledFavoriteFinished, dispatch),
        insertSingleArt: bindActionCreators(insertSingleArt, dispatch)
    }
}

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps) (DialogForInsertOrUpdate));