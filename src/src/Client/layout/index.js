import './normalize.less';
import './layout.less';
import './typography.less';
import './fonts.less';
import './guide.less';

if (window.location.search === '?grid=true') {
	const guide = document.createElement('div');

	guide.classList.add('guide');
	document.body.appendChild(guide);

	const guideContainer = document.createElement('div');

	guideContainer.classList.add('guide__container');
	guide.appendChild(guideContainer);

	for (let i = 0; i < 12; i += 1) {
		const column = document.createElement('div');

		column.classList.add('guide__column');
		guideContainer.appendChild(column);
	}
}
