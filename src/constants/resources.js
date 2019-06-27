let ResourcesConstants;

if (ENVIRONMENT === 'production') {
  ResourcesConstants = {
    WS_URL: 'wss://agorachatapi.herokuapp.com',
    API_URL: 'https://agorachatapi.herokuapp.com',
  }
} else {
  ResourcesConstants = {
    WS_URL: 'ws://lcl.agorachat.org:4000',
    API_URL: 'http://lcl.agorachat.org:4000',
    IFRAME_URL: 'http://lcl.agorachat.org:9001/index-embed.html',
    WWW_URL: 'https://lcl.agorachat.org:4000',
    APP_URL: 'http://localhost:3000',
  }
}

export const DEBUG = ENVIRONMENT !== 'production'
export const API_URL = ResourcesConstants.API_URL
export const WS_URL = ResourcesConstants.WS_URL