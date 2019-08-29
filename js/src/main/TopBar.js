/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import RebootDropdown from "rebootDropdown/RebootDropdown";
import NotificationsDropdown from "notifications/NotificationsDropdown/NotificationsDropdown";
import LanguagesDropdown from "languagesDropdown/LanguagesDropdown";

TopBar.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function TopBar({ ws }) {
    return (
        <>
            <RebootDropdown ws={ws} />
            <NotificationsDropdown ws={ws} />
            <LanguagesDropdown ws={ws} />
        </>
    );
}