/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import ClayModal, {useModal} from '@clayui/modal';
import React, {useState} from 'react';

type Props = {
	title: string;
};

export default function FormModal({title}: Props) {
	const [visible, setVisible] = useState(true);

	const {observer, onClose} = useModal({
		onClose: () => setVisible(false),
	});

	return (
		visible && (
			<ClayModal observer={observer} size="lg">
				<ClayModal.Header>{title}</ClayModal.Header>

				<ClayModal.Body>
					<p>Do you want to save your documents?</p>
				</ClayModal.Body>

				<ClayModal.Footer
					last={
						<ClayButton.Group spaced>
							<ClayButton
								displayType="secondary"
								onClick={() => onClose()}
							>
								Cancel
							</ClayButton>

							<ClayButton onClick={() => onClose()}>
								Save changes
							</ClayButton>
						</ClayButton.Group>
					}
				/>
			</ClayModal>
		)
	);
}
