import {LocalStorage} from 'fetchum';

window.API_BASE = process.env.API_BASE;
window.STORAGE_PREFIX = '@pipl-fb';

const defaultValues = () => {
  return {
    token: LocalStorage.getToken() || '',
    currentUser: LocalStorage.get('user') || null,
    errors: null,
    modal: null,
    friends: {
      nextLink: '',
      list: [],
    },
  };
};

export default defaultValues();
