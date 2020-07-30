/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "foris";

import useGuideFinish from "../hooks";

SkipGuideButton.propTypes = {
    location: PropTypes.object.isRequired,
};

export function SkipGuideButton({ location }) {
    const onGuideFinishHandler = useGuideFinish();
    const disabled = location.pathname === `/password`;
    return (
        <Button
            className={`guide-controls-button btn btn-warning ${
                disabled ? "disabled" : ""
            }`}
            style={{ pointerEvents: "not-allowed" }}
            onClick={onGuideFinishHandler}
            disabled={disabled}
        >
            <span className="d-none d-sm-block">
                {_("Skip guide")}
                &nbsp;
            </span>
            <i className="fas fa-forward" />
        </Button>
    );
}

const SkipGuideButtonWithRouter = withRouter(SkipGuideButton);

export default SkipGuideButtonWithRouter;
