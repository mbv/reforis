/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Button } from "foris";
import PropTypes from "prop-types";

import { SCAN_STATES } from "./hooks";

ScanWifiButton.propTypes = {
    state: PropTypes.oneOf(
        Object.keys(SCAN_STATES).map((key) => SCAN_STATES[key])
    ).isRequired,
};

export default function ScanWifiButton({ state, ...props }) {
    const isRunning = state === SCAN_STATES.RUNNING;
    let labelSubmitButton;
    switch (state) {
        case SCAN_STATES.RUNNING:
            labelSubmitButton = _("Scan is running…");
            break;
        case SCAN_STATES.FINISHED:
            labelSubmitButton = _("Scan again");
            break;
        default:
            labelSubmitButton = _("Scan");
    }

    return (
        <div className="text-right">
            <Button
                type="submit"
                className="btn-primary"
                loading={isRunning}
                disabled={isRunning}
                forisFormSize
                {...props}
            >
                {labelSubmitButton}
            </Button>
        </div>
    );
}
