/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import {
    CheckBox, TextInput, NumberInput, undefinedIfEmpty,
} from "foris";

import DHCPServerForm, { HELP_TEXT as DHCP_HELP_TEXT } from "common/network/DHCPServerForm";

const HELP_TEXTS = {
    router_ip: _("Router's IP address in the guest inner network."),
    netmask: _("Network mask of the guest inner network."),
    dhcp: DHCP_HELP_TEXT,
    qos: {
        enabled: _("This option enables you to set a bandwidth limit for the guest network, so that your main network doesn't get slowed-down by it."),
        download: _("Download speed in guest network (in kilobits per second)."),
        upload: _("Upload speed in guest network (in kilobits per second)."),
    },
};

GuestNetworkForm.propTypes = {
    formData: PropTypes.shape({
        enabled: PropTypes.bool.isRequired,
        ip: PropTypes.string,
        netmask: PropTypes.string,
        dhcp: PropTypes.object,
        qos: PropTypes.object,
    }),
    formErrors: PropTypes.shape({
        ip: PropTypes.string,
        netmask: PropTypes.string,
        qos: PropTypes.object,
    }),
    setFormValue: PropTypes.func,
};

GuestNetworkForm.defaultProps = {
    formData: {
        enabled: false,
    },
    formErrors: {},
};

export default function GuestNetworkForm({
    formData, formErrors, setFormValue, ...props
}) {
    return (
        <>
            <CheckBox
                label={_("Enable")}
                checked={formData.enabled}

                onChange={setFormValue(
                    (value) => ({ enabled: { $set: value } }),
                )}

                {...props}
            />
            {formData.enabled
                ? (
                    <>
                        <TextInput
                            label={_("Router IP address")}
                            value={formData.ip || ""}
                            error={formErrors.ip || null}
                            helpText={HELP_TEXTS.router_ip}
                            required

                            onChange={setFormValue(
                                (value) => ({ ip: { $set: value } }),
                            )}

                            {...props}
                        />
                        <TextInput
                            label={_("Network mask")}
                            value={formData.netmask || ""}
                            error={formErrors.netmask || null}
                            required

                            onChange={setFormValue(
                                (value) => ({ netmask: { $set: value } }),
                            )}

                            {...props}
                        />
                        <CheckBox
                            label={_("Enable DHCP")}
                            checked={formData.dhcp.enabled}
                            helpText={HELP_TEXTS.dhcp}

                            onChange={setFormValue(
                                (value) => ({ dhcp: { enabled: { $set: value } } }),
                            )}

                            {...props}
                        />
                        {formData.dhcp.enabled
                            ? (
                                <DHCPServerForm
                                    formData={formData.dhcp}
                                    updateRule={(value) => ({ dhcp: value })}
                                    setFormValue={setFormValue}

                                    {...props}
                                />
                            )
                            : null}
                        <CheckBox
                            label={_("Enable QoS")}
                            checked={formData.qos.enabled}
                            helpText={HELP_TEXTS.qos.enabled}

                            onChange={setFormValue(
                                (value) => ({ qos: { enabled: { $set: value } } }),
                            )}

                            {...props}
                        />
                        {formData.qos.enabled
                            ? (
                                <QoSForm
                                    formData={formData.qos}
                                    formErrors={formErrors.qos}
                                    setFormValue={setFormValue}

                                    {...props}
                                />
                            )
                            : null}

                    </>
                )
                : null}
        </>
    );
}

QoSForm.propTypes = {
    formData: PropTypes.shape({
        download: PropTypes.number,
        upload: PropTypes.number,
    }).isRequired,
    setFormValue: PropTypes.func.isRequired,
    formErrors: PropTypes.shape({
        download: PropTypes.string,
        upload: PropTypes.string,
    }),
};

QoSForm.defaultProps = {
    formErrors: {},
};

function QoSForm({
    formData, formErrors, setFormValue, ...props
}) {
    return (
        <>
            <NumberInput
                label={_("Download")}
                value={formData.download}
                error={formErrors.download}
                helpText={HELP_TEXTS.qos.download}
                inlineText="kb/s"

                min="1"
                required

                onChange={setFormValue(
                    (value) => ({ qos: { download: { $set: value } } }),
                )}

                {...props}
            />
            <NumberInput
                label={_("Upload")}
                value={formData.upload}
                error={formErrors.upload}
                helpText={HELP_TEXTS.qos.upload}
                inlineText="kb/s"
                min="1"
                required

                onChange={setFormValue(
                    (value) => ({ qos: { upload: { $set: value } } }),
                )}

                {...props}
            />
        </>
    );
}

export function validateQoS(formData) {
    const errors = {};
    if (formData.download < 1) {
        errors.download = _("Download speed must be positive");
    }
    if (formData.upload < 1) {
        errors.upload = _("Upload speed must be positive");
    }
    return undefinedIfEmpty(errors);
}
