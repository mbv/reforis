/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, {useState} from 'react';

import API from "./API";

export function useAPIGetData(endpoint) {
    const [isReady, setIsReady] = useState(false);
    function getData(callback = ()=>{}) {
        setIsReady(false);
        API[endpoint].get().then(data => {
            callback(data);
            setIsReady(true);
        });
    }

    return [getData, isReady]
}

export function useAPIPostData(endpoint) {
    function postData(data, callback = ()=>{}) {
        API[endpoint].post(data).then(
            data => {
                console.log(data); //TODO: remove
                callback(data);
            }
        );
    }

    return postData
}