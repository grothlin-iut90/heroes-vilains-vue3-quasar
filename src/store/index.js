import { createPinia } from 'pinia';

import { useAuthStore } from './modules/auth';
import { useGeneralStore } from './modules/general';
import { useErrorStore } from './modules/errors';
import { useOrganisationPasswordStore } from './modules/secret';

const pinia = createPinia();

export default pinia;

export {
  useAuthStore,
  useGeneralStore,
  useErrorStore,
  useOrganisationPasswordStore
};