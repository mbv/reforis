/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from 'react';
import {act, render, getByLabelText, fireEvent} from 'react-testing-library';

import mockFetch from '../../testUtils/mockFetch';
import {mockedWS} from '../../testUtils/mockWS';
import NotificationsEmailSettings from '../NotificationsCenter/NotificationsEmailSettings/NotificationsEmailSettings';
import {notificationsEmailSettingsFixure} from './__fixtures__/notificationsEmailSettings';


describe('<NotificationsDropdown/>', () => {
    let NotificationCenterContainer;

    beforeEach(() => {
        const mockWebSockets = new mockedWS();
        global.fetch = mockFetch(notificationsEmailSettingsFixure());
        const {container} = render(<NotificationsEmailSettings ws={mockWebSockets}/>);
        NotificationCenterContainer = container
    });

    it('Enabled, smtp_type:custom', () => {
        expect(NotificationCenterContainer.firstChild).toMatchSnapshot()
    });

    it('Disabled', () => {
        act(() => {
            fireEvent.click(getByLabelText(NotificationCenterContainer, 'Enable email notifications'));
        });
        expect(NotificationCenterContainer.firstChild).toMatchSnapshot()
    });

    it('Enabled,smtp_type:turris', () => {
        act(() => {
            fireEvent.click(getByLabelText(NotificationCenterContainer, 'Turris'));
        });
        expect(NotificationCenterContainer.firstChild).toMatchSnapshot()
    })
});