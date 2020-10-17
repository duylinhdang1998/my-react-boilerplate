import configureAppJson from '../../../configureApp.json';

type ConfigureAppJsonType = typeof configureAppJson;

type ConfigureAppJsonSettingType = ConfigureAppJsonType['settings'];

const configureApp: ConfigureAppJsonType = configureAppJson;

export default configureApp;
