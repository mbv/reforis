/*
 * Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useCallback, useEffect, useMemo, useState } from "react";

import { useAPIPost, useWSForisModule } from "foris";

import API_URLs from "common/API";

export const SCAN_STATES = {
    NOT_RUNNING: 0,
    RUNNING: 1,
    FINISHED: 2,
};

export default function useScanWifi(ws) {
    const initialResults = useMemo(() => [], []);

    const [state, setState] = useState(SCAN_STATES.NOT_RUNNING);
    const [id, setId] = useState(null);
    const [results, setResults] = useState(initialResults);

    const updateResults = useCallback(
        (data) => {
            if (data && data.scan_id === id) {
                if (data.data) {
                    // eslint-disable-next-line no-console
                    console.log(data.data);
                    setResults((prevResults) =>
                        filterResults(data.data.results, prevResults)
                    );
                } else {
                    // eslint-disable-next-line no-console
                    console.log(data.all_data);
                }
                if (data.success) setState(SCAN_STATES.FINISHED);
            }
        },
        [id]
    );

    const wsModule = "wifi";
    const [wsData] = useWSForisModule(ws, wsModule, "scan");
    useEffect(() => {
        updateResults(wsData);
    }, [wsData, id, updateResults]);
    const [wsFinishedData] = useWSForisModule(ws, wsModule, "scan_finished");
    useEffect(() => {
        updateResults(wsFinishedData);
    }, [wsFinishedData, id, updateResults]);

    const [triggerScanData, triggerScan] = useAPIPost(API_URLs.wifiScanTrigger);
    useEffect(() => {
        if (triggerScanData.data) {
            setState(SCAN_STATES.RUNNING);
            setResults(initialResults);
            setId(triggerScanData.data.scan_id);
        }
    }, [initialResults, triggerScanData]);

    return [state, results, triggerScan];
}

// eslint-disable-next-line no-unused-vars
function filterResults(results, prevResults) {
    return results.concat(prevResults); // TODO add merge
}
