/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */
import React from 'react';
import {render, getByText, queryByText, fireEvent, act} from 'react-testing-library';

import mockFetch from '../../testUtils/mockFetch';
import {mockedWS} from '../../testUtils/mockWS';
import {notificationsFixture} from './__fixtures__/notifications';
import NotificationsDropdown from '../NotificationsDropdown/NotificationsDropdown';


describe('useNotifications hook.', () => {
    let mockedFetch;
    let mockWebSockets;
    let notificationsContainer;
    beforeEach(async () => {
        mockedFetch = mockFetch(notificationsFixture());
        global.fetch = mockedFetch;
        mockWebSockets = new mockedWS();

        const {container} = render(<NotificationsDropdown ws={mockWebSockets}/>);
        notificationsContainer = container
    });

    it('Fetch notifications.', () => {
        expect(mockedFetch).toHaveBeenCalledTimes(1);
    });

    it('Render notifications.', () => {
        const HTMLnotificationMessage = queryByText(notificationsContainer, 'Notification message.');
        expect(HTMLnotificationMessage).not.toBeNull();
    });

    it("Don't show displayed notifications.", () => {
        const HTMLnotificationMessage = queryByText(notificationsContainer, 'Displayed notification me...');
        expect(HTMLnotificationMessage).toBeNull();
    });

    it("Dismiss notification.", () => {
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        act(() => {
            fireEvent.click(notificationsContainer.querySelector('[class="fas fa-times"]'));
        });
        expect(mockedFetch).toHaveBeenCalledTimes(2);
        let HTMLnotificationMessage = queryByText(notificationsContainer, 'Notification message.');
        expect(HTMLnotificationMessage).toBeNull();
        HTMLnotificationMessage = queryByText(notificationsContainer, 'Second notification messa...');
        expect(HTMLnotificationMessage).not.toBeNull();
    });

    it("Dismiss all notification.", () => {
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        act(() => {
            fireEvent.click(getByText(notificationsContainer, 'Dismiss all'));
        });
        expect(mockedFetch).toHaveBeenCalledTimes(2);
        let HTMLnotificationMessage = queryByText(notificationsContainer, 'Notification message.');
        expect(HTMLnotificationMessage).toBeNull();
        HTMLnotificationMessage = queryByText(notificationsContainer, 'Second notification messa...');
        expect(HTMLnotificationMessage).toBeNull();
    });
});