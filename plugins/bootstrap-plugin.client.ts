import * as bootstrap from 'bootstrap';

import 'bootstrap/dist/js/bootstrap.min.js';

export default defineNuxtPlugin(() => ({
  provide: {
    bootstrap: bootstrap,
  },
}));
