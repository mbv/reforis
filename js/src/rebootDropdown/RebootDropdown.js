/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import useNotifications from "notifications/hooks";
import RebootButton from "common/RebootButton";
import { ForisURLs } from "foris";
import { Link } from "react-router-dom";

import "./RebootDropdown.css";

RebootDropdown.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function RebootDropdown({ ws }) {
    const [notifications] = useNotifications(ws);

    const rebootNotification = notifications.find((notification) => notification.severity === "restart");
    if (!rebootNotification) {
        return null;
    }

    return (
        <div className="dropdown">
            <button type="button" id="reboot-dropdown-toggle" className="nav-item btn btn-link">
                <i className="fas fa-power-off fa-lg" />
            </button>
            <div className="dropdown-menu">
                <div className="dropdown-header">
                    <h5>{_("Reboot Required")}</h5>
                </div>
                <div className="dropdown-divider" />
                <div className="dropdown-item">
                    <Link to={{ pathname: ForisURLs.notifications, search: `?id=${rebootNotification.id}` }}>
                        <button type="button" className="btn btn-primary mr-3">{_("Details")}</button>
                    </Link>
                    <RebootButton />
                </div>
            </div>
        </div>
    );
}
