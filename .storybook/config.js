import { configure } from '@kadira/storybook';
import './styles.css';

const req = require.context('../src/js/', true, /\.story\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
