import '../layout/index';

function importAll(r) {
	r.keys().forEach(r);
}

importAll(require.context('../../Web/App_Plugins', true, /index\.js$/));
