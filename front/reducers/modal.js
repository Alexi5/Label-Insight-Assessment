import React from 'react'

const SHOW_MODAL = 'SHOW_MODAL';
const initialState = {
    showModal: false,
}

//Action
export const showModal = function (boolean) {
    return {
        type: SHOW_MODAL,
        showModal: boolean
    };
};

/// Reducer
export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return action.showModal;
        default:
            return state;
    }
}
