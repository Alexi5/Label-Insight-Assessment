import React from 'react';
import axios from 'axios'

//CONSTANTS
const GET_ALL_PHOTOS = 'GET_ALL_PHOTOS';
const GET_SINGLE_PHOTO = 'GET_SINGLE_PHOTO';

//REDUCER // updates the store 
const initialState = {};

export default function (state = initialState, action) {
    const nextState = Object.assign({}, state)
    
    switch (action.type) {
        case GET_SINGLE_PHOTO:
            nextState[action.photo.id] = action.photo
            return nextState
        case GET_ALL_PHOTOS:
            return action.allPhotos;
         default:
            return state;
    }
    return nextState;
}

//ACTION CREATORS 
const setPhoto = photo => {
    return {
        type: GET_SINGLE_PHOTO,
        photo: photo
    }
}

const setPhotos = photos => {
    return {
        type: GET_ALL_PHOTOS,
        allPhotos: photos
    }
}


// DISPATCHERS
export const setAllPhotos = photos => {
    let photosArr =[];

    return dispatch => {
        photos.forEach( (photo, id) => {
            if(id < 25){
                photosArr.push(photo)
            }
        })
        return dispatch(setPhotos(photosArr))
    }
};
export const getAllPhotos = () => {
    return dispatch => {
        axios.get(`https://jsonplaceholder.typicode.com/photos`)
        .then( res => {
            dispatch(setAllPhotos(res.data))
        })
    }
}

//single photo
export const setSinglePhoto = photo => {
    return dispatch => {
        return dispatch(setPhoto(photo))
    }
}

export const getSinglePhoto = photoId => {
    return dispatch => {
        axios.get(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
        .then( res => {
            dispatch(setSinglePhoto(res.data))
        })
    }
}

export const updatePhoto = (id, description) => {
    return (dispatch, getState) => {
        return axios.put(`https://jsonplaceholder.typicode.com/photos/${id}`,
            id: id, description: description)
        .then(res => {
            let description = res.config[0];
            let foundId = res.data.id;
            
            let changedPhoto = {}
            changedPhoto['description'] = description
            
            let foundPhoto = getState().photos[foundId-1] //hacked to account for 0 index
            Object.assign(foundPhoto, changedPhoto)
            
            return foundPhoto;
        })
    }
}



