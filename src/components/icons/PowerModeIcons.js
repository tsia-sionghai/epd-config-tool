import { jsx as _jsx } from "react/jsx-runtime";
import imgPowerOff from '../../assets/icons/img_power_off.png';
import imgPowerSleep from '../../assets/icons/img_power_sleep.png';
import imgPowerNormal from '../../assets/icons/img_power_normal.png';
export const OffModeIcon = ({ width = 62, height = 61 }) => (_jsx("img", { src: imgPowerOff, alt: "Off Mode", style: { width, height } }));
export const SleepModeIcon = ({ width = 62, height = 61 }) => (_jsx("img", { src: imgPowerSleep, alt: "Sleep Mode", style: { width, height } }));
export const NormalModeIcon = ({ width = 62, height = 61 }) => (_jsx("img", { src: imgPowerNormal, alt: "Normal Mode", style: { width, height } }));
