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
                // eslint-disable-next-line no-console
                console.log(data.data);
                setResults((prevTestResults) => ({
                    ...prevTestResults,
                    ...filterResults(data.data),
                }));
                if (data.passed) setState(SCAN_STATES.FINISHED);
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

    const [triggerTestData, triggerTest] = useAPIPost(API_URLs.wifiScanTrigger);
    useEffect(() => {
        if (triggerTestData.data) {
            setState(SCAN_STATES.RUNNING);
            setResults(initialResults);
            setId(triggerTestData.data.scan_id);
        }
    }, [initialResults, triggerTestData]);

    return [state, results, triggerTest];
}

function filterResults(results) {
    return Object.keys(results).reduce((res, test) => {
        res[test] = results[test];
        return res;
    }, {});
}
