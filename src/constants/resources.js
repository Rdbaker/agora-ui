let ResourcesConstants;

if (ENVIRONMENT === 'production') {
  ResourcesConstants = {
    WS_URL: 'wss://agorachatapi.herokuapp.com',
    API_URL: 'https://agorachatapi.herokuapp.com',
    SHIM_URL: 'https://js.agorachat.org/embed/shim.js',
    AGORA_ON_AGORA_CLIENT_ID: 'YLNYinTQr-eH',
  }
} else {
  ResourcesConstants = {
    WS_URL: 'ws://lcl.agorachat.org:4000',
    API_URL: 'http://lcl.agorachat.org:4000',
    SHIM_URL: 'http://lcl.agorachat.org:9000/shim.js',
    WWW_URL: 'https://lcl.agorachat.org:4000',
    APP_URL: 'http://localhost:3000',
    AGORA_ON_AGORA_CLIENT_ID: 'V1nFf2GCaJ_l',
  }
}

export const DEBUG = ENVIRONMENT !== 'production'
export const API_URL = ResourcesConstants.API_URL
export const WS_URL = ResourcesConstants.WS_URL
export const AGORA_ON_AGORA_CLIENT_ID = ResourcesConstants.AGORA_ON_AGORA_CLIENT_ID
export const SHIM_URL = ResourcesConstants.SHIM_URL