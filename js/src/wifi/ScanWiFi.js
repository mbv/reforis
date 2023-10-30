/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect, useState } from "react";

import {
    ALERT_TYPES,
    API_STATE,
    Button,
    formFieldsSize,
    useAlert,
    useAPIPost,
} from "foris";
import PropTypes from "prop-types";

ScanWiFi.propTypes = {
    ws: PropTypes.object.isRequired,
    endpoint: PropTypes.string.isRequired,
};

export default function ScanWiFi({ ws, endpoint }) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const module = "wifi";
        ws.subscribe(module).bind(module, "reset", () => {
            // eslint-disable-next-line no-restricted-globals
            setTimeout(() => location.reload(), 1000);
        });
    }, [ws]);

    const [postResetResponse, postScan] = useAPIPost(endpoint);
    const [setAlert, dismissAlert] = useAlert();
    useEffect(() => {
        if (postResetResponse.state === API_STATE.ERROR) {
            setAlert(_("An error occurred during resetting Wi-Fi settings."));
        } else if (postResetResponse.state === API_STATE.SUCCESS) {
            setAlert(
                _("Wi-Fi scan."),
                ALERT_TYPES.SUCCESS
            );
        }
    }, [postResetResponse, setAlert]);

    function onScan() {
        dismissAlert();
        setIsLoading(true);
        const data = {
            device_name: "radio0",
        };
        postScan({ data });
    }

    return (
        <div className={formFieldsSize}>
            <h2>{_("Scan Wi-Fi")}</h2>
            <div className="text-right">
                <Button
                    className="btn-primary"
                    forisFormSize
                    loading={isLoading}
                    disabled={isLoading}
                    onClick={onScan}
                >
                    {_("Scan Wi-Fi")}
                </Button>
            </div>
        </div>
    );
}
