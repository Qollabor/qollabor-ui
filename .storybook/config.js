import { configure } from '@kadira/storybook';
import './styles.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

const req = require.context('../src/js/', true, /\.story\.jsx$/);

injectTapEventPlugin();

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
