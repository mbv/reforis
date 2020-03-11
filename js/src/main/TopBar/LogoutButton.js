/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API_STATE, ForisURLs, useAPIPost } from "foris";

import API_URLs from "common/API";

export default function LogoutButton() {
    const history = useHistory();
    const [logout, postLogout] = useAPIPost(API_URLs.logout);

    useEffect(() => {
        if (logout.state === API_STATE.SUCCESS) {
            history.push(ForisURLs.login);
        }
    }, [history, logout.state]);

    return (
        <div>
            <button
                className="nav-item btn btn-link"
                type="button"
                onClick={postLogout}
            >
                {_("Logout")}
            </button>
        </div>
    );
}
