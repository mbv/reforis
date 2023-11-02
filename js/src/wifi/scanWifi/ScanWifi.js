/*
 * Copyright (C) 2020-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import PropTypes from "prop-types";

import useScanWifi from "./hooks";
import ScanWifiButton from "./ScanWifiButton";
import ScanWifiResults from "./ScanWifiResult";

ScanWifi.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function ScanWifi({ ws }) {
    const [state, scanResults, triggerScan] = useScanWifi(ws);

    function onSubmit(e) {
        e.preventDefault();
        const data = {
            device_names: ["radio0", "radio1"],
        };
        triggerScan({ data });
    }

    return (
        <form>
            <ScanWifiResults state={state} scanResults={scanResults} />
            <ScanWifiButton state={state} onClick={onSubmit} />
        </form>
    );
}
