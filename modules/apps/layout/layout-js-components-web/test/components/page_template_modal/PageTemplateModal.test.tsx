/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {act, fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {fetch} from 'frontend-js-web';
import React from 'react';

import PageTemplateModal from '../../../src/main/resources/META-INF/resources/js/components/page_template_modal/PageTemplateModal';

import '@testing-library/jest-dom/extend-expect';

jest.mock('frontend-js-web', () => ({
	...jest.requireActual('frontend-js-web'),
	fetch: jest.fn().mockReturnValue(Promise.resolve([{}])),
}));

const mockedFetch = fetch as jest.MockedFunction<() => Promise<{}>>;

function renderConvertToPageTemplateModal() {
	return render(
		<PageTemplateModal
			createLayoutPageTemplateEntryURL="http://localhost:8080/3ef9f582-c438-1ffe-6581-8ff5ff657af2?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Flayout_content_page_editor%2Fcreate_layout_page_template_entry&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_backURL=http%3A%2F%2Flocalhost%3A8080%2Fhome&p_l_mode=edit"
			getLayoutPageTemplateCollectionsURL="http://localhost:8080/3ef9f582-c438-1ffe-6581-8ff5ff657af2?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=%2Flayout_content_page_editor%2Fget_layout_page_template_collections&p_p_cacheability=cacheLevelPage&p_l_mode=edit"
			hasMultipleSegmentsExperienceIds={true}
			layoutId="0"
			observer={{
				dispatch: () => {},
				mutation: [true, true],
			}}
			onClose={jest.fn()}
			segmentsExperienceId="0"
		/>
	);
}

describe('ConvertToPageTemplateModal', () => {
	afterEach(() => {
		mockedFetch.mockReset();
	});

	describe('Select Page Template Set modal', () => {
		it('renders the Select Page Template Set modal', async () => {
			mockedFetch.mockReturnValue(
				Promise.resolve(
					new Response(
						JSON.stringify([
							{id: '34286', name: 'Untitled Set'},
							{id: '34112', name: 'Untitled Set 2'},
						])
					)
				)
			);

			await act(async () => {
				renderConvertToPageTemplateModal();
			});

			expect(
				screen.getByText('select-page-template-set')
			).toBeInTheDocument();
		});

		it('calls createLayoutPageTemplateEntry when a page template set is selected and the button save is pressed', async () => {
			mockedFetch.mockReturnValue(
				Promise.resolve(
					new Response(
						JSON.stringify([
							{id: '34286', name: 'Untitled Set'},
							{id: '34112', name: 'Untitled Set 2'},
						])
					)
				)
			);

			await act(async () => {
				renderConvertToPageTemplateModal();
			});

			const saveButton = screen.getByText('save');
			const select = screen.getByLabelText('page-template-set');

			userEvent.selectOptions(select, 'test');
			fireEvent.change(select);

			await act(async () => {
				userEvent.click(saveButton);
			});

			expect(mockedFetch).toHaveBeenCalledTimes(1);
		});

		it('does not call createLayoutPageTemplateEntry when a page template set is not selected and the Save button is pressed', async () => {
			mockedFetch.mockReturnValue(
				Promise.resolve(
					new Response(
						JSON.stringify([
							{id: '34286', name: 'Untitled Set'},
							{id: '34112', name: 'Untitled Set 2'},
						])
					)
				)
			);

			await act(async () => {
				renderConvertToPageTemplateModal();
			});

			const saveButton = screen.getByText('save');

			userEvent.click(saveButton);

			expect(mockedFetch).toHaveBeenCalledTimes(1);
		});

		it('changes the modal when the Save In New Set Button is pressed', async () => {
			mockedFetch.mockReturnValue(
				Promise.resolve(
					new Response(
						JSON.stringify([
							{id: '34286', name: 'Untitled Set'},
							{id: '34112', name: 'Untitled Set 2'},
						])
					)
				)
			);
			await act(async () => {
				renderConvertToPageTemplateModal();
			});

			const saveInNewSetButton = screen.getByText('save-in-new-set');

			userEvent.click(saveInNewSetButton);

			expect(
				screen.getByText('add-page-template-set')
			).toBeInTheDocument();
		});
	});

	describe('Add Page Template Set modal', () => {
		it('renders the Select Add Template Set modal when there are no sets', async () => {
			mockedFetch.mockReturnValue(
				Promise.resolve({
					json: () => {
						return [];
					},
				})
			);

			await act(async () => {
				renderConvertToPageTemplateModal();
			});

			expect(
				screen.getByText('add-page-template-set')
			).toBeInTheDocument();
		});

		it('calls createLayoutPageTemplateEntry when the Save button is pressed', async () => {
			mockedFetch.mockReturnValue(
				Promise.resolve({
					json: () => {
						return [];
					},
				})
			);

			await act(async () => {
				renderConvertToPageTemplateModal();
			});

			const descriptionInput = screen.getByLabelText('description');
			const saveButton = screen.getByText('save');

			userEvent.type(descriptionInput, 'This is a description');

			await act(async () => {
				userEvent.click(saveButton);
			});

			expect(mockedFetch).toHaveBeenCalledTimes(2);
		});

		it('does not call createLayoutPageTemplateEntry when the input name is empty and the Save button is pressed', async () => {
			mockedFetch.mockReturnValue(
				Promise.resolve(
					new Response(
						JSON.stringify([
							{id: '34286', name: 'Untitled Set'},
							{id: '34112', name: 'Untitled Set 2'},
						])
					)
				)
			);

			await act(async () => {
				renderConvertToPageTemplateModal();
			});

			const nameInput = screen.getByLabelText('page-template-set');
			const saveButton = screen.getByText('save');

			fireEvent.change(nameInput, {
				target: {value: ''},
			});
			userEvent.click(saveButton);

			expect(mockedFetch).toHaveBeenCalledTimes(1);
		});
	});
});
