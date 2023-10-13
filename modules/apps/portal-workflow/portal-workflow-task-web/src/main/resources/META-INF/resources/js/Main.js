/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {getWindow, openWindow} from 'frontend-js-web';

export default function ({
	namespace: portletNamespace,
	randomId,
	workflowTasks,
}) {
	const commentsValue = {};

	const showPopup = (form, height, previousActiveElement, title) => {
		openWindow({
			dialog: {
				bodyContent: form,
				destroyOnHide: true,
				height,
				resizable: false,
				toolbars: {
					footer: [
						{
							cssClass: 'btn btn-secondary task-action-button',
							discardDefaultButtonCssClasses: true,
							label: Liferay.Language.get('cancel'),
							on: {
								click() {
									if (form) {
										form.reset();
									}

									getWindow().destroy();
								},
							},
						},
						{
							cssClass: 'btn btn-primary task-action-button',
							discardDefaultButtonCssClasses: true,
							label: Liferay.Language.get('done'),
							on: {
								click() {
									if (form) {
										let hasErrors = false;

										const liferayForm = Liferay.Form.get(
											form.getAttribute('id')
										);

										if (liferayForm) {
											const validator =
												liferayForm.formValidator;

											if (validator) {
												validator.validate();

												hasErrors = validator.hasErrors();
											}
										}

										if (!hasErrors) {
											submitForm(form);
										}
									}
								},
							},
						},
					],
					header: [
						{
							cssClass: 'close',
							discardDefaultButtonCssClasses: true,
							labelHTML:
								'<svg class="lexicon-icon lexicon-icon-times" focusable="false" role="presentation" viewBox="0 0 512 512"><path class="lexicon-icon-outline" d="M295.781 256l205.205-205.205c10.998-10.998 10.998-28.814 0-39.781-10.998-10.998-28.815-10.998-39.781 0l-205.205 205.205-205.205-205.238c-10.966-10.998-28.814-10.998-39.781 0-10.998 10.998-10.998 28.814 0 39.781l205.205 205.238-205.205 205.205c-10.998 10.998-10.998 28.815 0 39.781 5.467 5.531 12.671 8.265 19.874 8.265s14.407-2.734 19.907-8.233l205.205-205.238 205.205 205.205c5.5 5.5 12.703 8.233 19.906 8.233s14.407-2.734 19.906-8.233c10.998-10.998 10.998-28.815 0-39.781l-205.238-205.205z"></path></svg>',
							on: {
								click() {
									if (form) {
										form.reset();
									}

									getWindow().destroy();
								},
							},
							title: Liferay.Language.get('close'),
						},
					],
				},
				width: 896,
			},
			title: Liferay.Util.escapeHTML(title),
		});
	};

	const onTaskClickFn = (event) => {
		event.preventDefault();

		const icon = event.currentTarget;

		const form = document.createElement('form');

		form.setAttribute('action', icon.href);
		form.setAttribute('method', 'POST');

		let comments = document.getElementById(randomId + 'updateComments');

		if (comments && !commentsValue[randomId]) {
			commentsValue[randomId] = comments;
		}
		else if (!comments && commentsValue[randomId]) {
			comments = commentsValue[randomId];
		}

		if (comments) {
			comments.classList.remove('hide');
			form.append(comments);
		}

		const previousActiveElement = document.getElementById('main-content');

		showPopup(form, 400, previousActiveElement, icon.text);
	};

	for (let i = 0; i < workflowTasks.length; i++) {
		const taskLink = `${portletNamespace}${randomId}${workflowTasks[i]}taskChangeStatusLink`;
		const element = document.getElementById(taskLink);
		element?.addEventListener('click', onTaskClickFn);
	}
}
