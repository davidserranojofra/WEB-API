'use strict';

const i18n = require('i18n');
const path = require('path');

module.exports = function(defaultLocale) {
  defaultLocale = defaultLocale || process.env.NODE_LANG || 'es';
// registrar lenguajes
  i18n.configure({
    directory: path.join(__dirname, '..', 'locales'),
    locales: ['es', 'en'],
    defaultLocale: defaultLocale,
    register: global, //no se necesita usar el i18n. ni importarlo, con el  __('') ya esta
    syncFiles: true,
    // objectNatation: true, //esto podria anidar coche.ruedas en el json
    queryParameter: 'lang',
    cookie: 'cookie-idioma'
  });

  i18n.setLocale(defaultLocale);
  return i18n;
}