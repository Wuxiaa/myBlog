/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1591103588804_2883';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  exports.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'myblog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf :{
      enable : false
    },
    domainWhiteList:['*']
  }

  // config.cors = {
  //   origin : '*',
  //   allowMethods : 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTION'
  // }

  config.cors = {
    origin : 'http://localhost:3000',
    credentials:true,
    allowMethods : 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTION'
  }

  return {
    ...config,
    ...userConfig,
  };
};
