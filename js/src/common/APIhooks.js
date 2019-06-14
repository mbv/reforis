/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import {useCallback, useReducer} from 'react';
import axios from 'axios';

const POST_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export const TIMEOUT = 5000;

const API_ACTIONS = {
    INIT: 1,
    SUCCESS: 2,
    FAILURE: 3,
};

export function useAPIGet(url) {
    const [state, dispatch] = useReducer(APIGetReducer, {
        isLoading: false,
        isError: false,
        data: null,
    });

    const get = useCallback(async () => {
        dispatch({type: API_ACTIONS.INIT});
        try {
            const result = await axios.get(url, {
                timeout: TIMEOUT
            });
            dispatch({type: API_ACTIONS.SUCCESS, payload: result.data});
        } catch (error) {
            dispatch({type: API_ACTIONS.FAILURE, payload: error.response.data});
        }
    }, [url]);

    return [state, get];
}

const APIGetReducer = (state, action) => {
    switch (action.type) {
        case API_ACTIONS.INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case API_ACTIONS.SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case API_ACTIONS.FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: action.payload,
            };
        default:
            throw new Error();
    }
};

export function useAPIPost(url) {
    const [state, dispatch] = useReducer(APIPostReducer, {
        isSending: false,
        isError: false,
        isSuccess: false,
        data: null,
    });

    const post = async (data) => {
        dispatch({type: API_ACTIONS.INIT});
        try {
            const result = await axios.post(url, data, {
                timeout: TIMEOUT,
                headers: POST_HEADERS,
            });
            dispatch({type: API_ACTIONS.SUCCESS, payload: result.data});
        } catch (error) {
            dispatch({type: API_ACTIONS.FAILURE, payload: error.response.data});
        }
    };
    return [state, post];
}

const APIPostReducer = (state, action) => {
    switch (action.type) {
        case API_ACTIONS.INIT:
            return {
                ...state,
                isSending: true,
                isError: false,
                isSuccess: false,
            };
        case API_ACTIONS.SUCCESS:
            return {
                ...state,
                isSending: false,
                isError: false,
                isSuccess: true,
                data: action.payload
            };
        case API_ACTIONS.FAILURE:
            return {
                ...state,
                isSending: false,
                isError: true,
                isSuccess: false,
                data: action.payload,
            };
        default:
            throw new Error();
    }
};
