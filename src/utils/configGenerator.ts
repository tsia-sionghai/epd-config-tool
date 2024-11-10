// src/utils/configGenerator.ts
import { 
  ModeType, 
  PowerModeType, 
  TimeZoneType, 
  ImageConfig, 
  NetworkConfig,
  SignageConfig,
  SignageConfigFile 
} from '../types/common';

// 生成內部使用的配置
export const generateConfig = (
  customer: string,  // 新增 customer 參數
  mode: ModeType,
  powerMode: PowerModeType,
  timeZone: TimeZoneType,
  imageConfig: ImageConfig,
  networkConfig?: NetworkConfig
): SignageConfig => {
  const baseConfig: SignageConfig = {
    Customer: customer,
    Mode: mode,
    PowerMode: powerMode,
    TimeZone: timeZone,
    SoftAP: "0",
    Path: "/sdcard/image/slideshow",
    Size: imageConfig.size,
    Rotate: imageConfig.rotate,
    Interval: imageConfig.interval,
    WifiSetting: "",
    ServerURL: "",
    PackageName: "",
    ActivityName: ""
  };

  // 處理網路設定
  if (mode === 'cms' || mode === 'nas') {
    if (networkConfig) {
      if (networkConfig.wifi === 'staticIP') {
        baseConfig.WifiSetting = {
          Mode: networkConfig.wifi,
          SSID: networkConfig.ssid,
          Password: networkConfig.password,
          IP_addr: networkConfig.ip,
          Netmask: networkConfig.netmask,
          Gateway: networkConfig.gateway,
          DNS: networkConfig.dns
        };
      } else {
        baseConfig.WifiSetting = `${networkConfig.ssid}${
          networkConfig.password ? ',' + networkConfig.password : ''
        }`;
      }
      
      if (mode === 'cms' && networkConfig.serverURL) {
        baseConfig.ServerURL = networkConfig.serverURL;
      }
    }
  }

  return baseConfig;
};

// 新增：轉換為檔案格式的函數
export const convertToConfigFile = (config: SignageConfig): SignageConfigFile => {
  return {
    ...config,
    Rotate: config.Rotate.toString(),
    Interval: config.Interval.toString()
  };
};
