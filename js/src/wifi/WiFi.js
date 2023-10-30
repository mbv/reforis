/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";

import {
    Alert,
    ALERT_TYPES,
    WiFiSettings,
    ResetWiFiSettings,
    useAPIGet,
    withSpinnerOnSending,
    withErrorMessage,
} from "foris";
import PropTypes from "prop-types";

import API_URLs from "common/API";

import ScanWiFi from "./ScanWiFi";

WiFi.propTypes = {
    ws: PropTypes.object.isRequired,
};

export const NO_WIFI_CARDS = _(
    "Unfortunately, we were unable to detect any wireless cards in your router."
);

export default function WiFi({ ws }) {
    const [getWiFiResponse, getWiFi] = useAPIGet(API_URLs.wifi);

    useEffect(() => {
        getWiFi();
    }, [getWiFi]);

    return (
        <>
            <h1>{_("Wi-Fi")}</h1>
            <p>
                {_(
                    "If you want to use your router as a Wi-Fi access point, enable Wi-Fi here and fill in an SSID (the name of the access point) and a corresponding password. You can then set up your mobile devices using the QR code available within the form."
                )}
            </p>

            <WiFiSettingsWithErrorAndSpinner
                ws={ws}
                apiState={getWiFiResponse.state}
                wifiDetails={getWiFiResponse.data || {}}
            />
        </>
    );
}

WiFiSettingsWrapper.propTypes = {
    ws: PropTypes.object.isRequired,
    wifiDetails: PropTypes.shape({
        devices: PropTypes.array.isRequired,
    }),
};

function WiFiSettingsWrapper({ ws, wifiDetails }) {
    let componentContent;
    if (wifiDetails.devices.length === 0) {
        componentContent = (
            <>
                <Alert type={ALERT_TYPES.WARNING}>{NO_WIFI_CARDS}</Alert>
                <ResetWiFiSettings ws={ws} endpoint={API_URLs.wifiReset} />
            </>
        );
    } else {
        componentContent = (
            <>
                <ScanWiFi endpoint={API_URLs.wifiScan} ws={ws} />
                <WiFiSettings
                    ws={ws}
                    endpoint={API_URLs.wifi}
                    resetEndpoint={API_URLs.wifiReset}
                />
            </>
        );
    }

    return <>{componentContent}</>;
}

const WiFiSettingsWithErrorAndSpinner = withSpinnerOnSending(
    withErrorMessage(WiFiSettingsWrapper)
);
