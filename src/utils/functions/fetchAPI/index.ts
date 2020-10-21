import configureApp from '@utils/constants/configureApp';
import qs from 'qs';
import { CANCEL } from 'redux-saga';
import { store } from '@stores/configureStore';
import ConfigureAxios from './ConfigureAxios';

interface RefreshTokenResponseData {
  data: {
    accessToken: string;
  };
}

interface AxiosData {
  refreshToken: string;
  accessToken: string;
}

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    baseURL: configureApp.api.baseUrl,
    timeout: configureApp.api.timeout,
    paramsSerializer: (params) => {
      const { auth } = store.getState();
      return qs.stringify({
        ...params,
        _sand_domain: !!auth.domain ? auth.domain : params._sand_domain,
        _sand_ajax: '1',
        _sand_platform: '1',
        _sand_app_name: 'vieted',
        _sand_readmin: '1',
        _sand_is_wan: false,
      });
    },
  },
  setAccessToken() {
    if (!store) {
      return '';
    }
    const { auth } = store.getState();
    return auth.isLoggedIn ? auth.token : '';
  },
  setRefreshToken() {
    if (!store) {
      return '';
    }
    return 'lotus lms';
    // Get refresh token
    // const { auth } = store.getState();
    // return auth.isLoggedIn ? auth.data.refreshToken : '';
  },
  setParams() {
    const { auth } = store.getState();
    return {
      _sand_token: auth.token,
      _sand_uid: auth.data?.id,
      _sand_uiid: auth.data?.iid,
    };
  },
});

const fetchAPI = axiosConfig.create();

axiosConfig.sagaCancelAxiosRequest(CANCEL);

axiosConfig.accessToken({
  setCondition(config) {
    const isAppURL = config?.url?.search(/^http/g) === -1;
    return isAppURL;
  },
});

axiosConfig.sandToken({
  setCondition(config) {
    const isAppURL = config?.url?.search(/^http/g) === -1;
    return isAppURL;
  },
});

axiosConfig.setFormData();

// axiosConfig.refreshToken<RefreshTokenResponseData, AxiosData>({
//   url: 'jwt/renew-access-token',
//   setRefreshCondition(error) {
//     return error.response?.status === 401 && !error.config.url?.includes('jwt/renew-access-token');
//   },
//   axiosData(refreshToken, accessToken) {
//     return {
//       refreshToken,
//       accessToken,
//     };
//   },
//   success(res, originalRequest) {
//     store.dispatch(
//       updateToken({
//         accessToken: res.data.data.accessToken,
//       }),
//     );
//     originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
//   },
//   failure(error) {
//     console.log(error.response);
//     store.dispatch(logout());
//     alertMessageWithOption(i18n.t('tokenExpired'), i18n.t('loginAgain'), onOpenModalLogin);
//   },
// });

export default fetchAPI;
