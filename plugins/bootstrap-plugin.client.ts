import * as bootstrap from 'bootstrap';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default defineNuxtPlugin(() => ({
  provide: {
    bootstrap: bootstrap,
  },
}));
