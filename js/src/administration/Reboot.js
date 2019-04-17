/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from 'react';
import propTypes from 'prop-types';

Reboot.propTypes = {
    ws: propTypes.object.isRequired
};

export default function Reboot({ws}) {
    return <>
        <h3>{_('Reboot')}</h3>
    </>
}
