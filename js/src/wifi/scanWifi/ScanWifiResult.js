/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { SpinnerElement } from "foris";
import PropTypes from "prop-types";

import { SCAN_STATES } from "./hooks";

ScanWifiResults.propTypes = {
    state: PropTypes.number,
    scanResults: PropTypes.array,
};

export default function ScanWifiResults({ state, scanResults }) {
    return (
        <table className="table table-borderless table-hover col-sm-12">
            <tbody>
                {scanResults.map((result) =>
                    result !== undefined ? (
                        <ScanWifiResultItem
                            key={result.bssid}
                            result={result}
                            state={state}
                        />
                    ) : null
                )}
            </tbody>
        </table>
    );
}

ScanWifiResultItem.propTypes = {
    result: PropTypes.object,
    state: PropTypes.number,
};

function ScanWifiResultItem({ result, state }) {
    return (
        <tr>
            <th scope="row">{result.ssid}</th>
            <td className="text-right">
                {state === SCAN_STATES.RUNNING ? (
                    <SpinnerElement small className="text-secondary" />
                ) : (
                    <p>{result.mhz}</p>
                )}
            </td>
        </tr>
    );
}

ConnectionTestIcon.propTypes = {
    result: PropTypes.bool,
};

function ConnectionTestIcon({ result }) {
    let icon;
    let iconColor;
    let title;

    switch (result) {
        case true:
            title = _("Connection test successful");
            icon = "check";
            iconColor = "success";
            break;
        case false:
            title = _("Connection test failed");
            icon = "times";
            iconColor = "danger";
            break;
        default:
            title = _("Connection test not started");
            icon = "minus";
            iconColor = "secondary";
    }
    return (
        <span className={`text-${iconColor}`}>
            <i className={`fas fa-${icon}`} title={title} />
        </span>
    );
}
