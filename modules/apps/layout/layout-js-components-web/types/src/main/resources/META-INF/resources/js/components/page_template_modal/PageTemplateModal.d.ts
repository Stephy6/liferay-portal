/**
 * SPDX-FileCopyrightText: (c) 2023 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

/// <reference types="react" />

import {Observer} from '@clayui/modal/lib/types';
interface Props {
	createLayoutPageTemplateEntryURL: string;
	getLayoutPageTemplateCollectionsURL: string;
	hasMultipleSegmentsExperienceIds: boolean;
	layoutId: string;
	namespace?: string;
	observer: Observer;
	onClose: () => {};
	segmentsExperienceId: string;
}
export default function PageTemplateModal({
	createLayoutPageTemplateEntryURL,
	getLayoutPageTemplateCollectionsURL,
	hasMultipleSegmentsExperienceIds,
	layoutId,
	namespace,
	observer,
	onClose,
	segmentsExperienceId,
}: Props): JSX.Element;
export {};
