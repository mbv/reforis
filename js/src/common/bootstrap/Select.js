/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from 'react';
import propTypes from 'prop-types';
import {useUID} from 'react-uid/dist/es5/index';

import {LABEL_SIZE, FIELD_SIZE} from './constants';


Select.propTypes = {
    label: propTypes.string.isRequired,
    choices: propTypes.object.isRequired,
    value: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
    ]).isRequired,
    helpText: propTypes.string,
};

export default function Select({label, choices, helpText, ...props}) {
    const uid = useUID();

    const options = Object.keys(choices).map(
        key => <option key={key} value={key}>{choices[key]}</option>
    );

    return <div className='form-group row'>
        <label className={'form-control-label col-sm-' + LABEL_SIZE} htmlFor={uid}>{label}</label>
        <div className={'col-sm-' + FIELD_SIZE}>
            <select
                className='form-control'
                id={uid}
                {...props}
            >
                {options}
            </select>
            <small className='form-text text-muted'>{helpText}</small>
        </div>
    </div>;
}

