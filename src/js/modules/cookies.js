const cookiesSuccessBtn = document.querySelector('.cookies__btn');
const cookiesBanner = document.querySelector('.cookies');

const domain = window.location.hostname;
const path = '/';
const maxAge = 3600;

const getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (name, value, options = {}) => {
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

const showCookiesNotification = () => {
  const showCookiesBanner = getCookie('allowCookies');

  if (!showCookiesBanner) {
    setTimeout(() => {
      cookiesBanner.classList.add('opened');
    }, 1000);
    cookiesSuccessBtn.addEventListener('click', () => {
      setCookie('allowCookies', true, {path, domain, 'max-age': maxAge});
      cookiesBanner.classList.remove('opened');
    });
  }
};

export default showCookiesNotification;
