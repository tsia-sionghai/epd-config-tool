import { jsx as _jsx } from "react/jsx-runtime";
import imgAuto from '../../assets/icons/img_auto.png';
import imgCms from '../../assets/icons/img_cms.png';
import imgNas from '../../assets/icons/img_nas.png';
export const AutoModeIcon = ({ width = 62, height = 61 }) => (_jsx("img", { src: imgAuto, alt: "Auto Mode", style: { width, height } }));
export const CMSModeIcon = ({ width = 62, height = 61 }) => (_jsx("img", { src: imgCms, alt: "CMS Mode", style: { width, height } }));
export const NASModeIcon = ({ width = 62, height = 61 }) => (_jsx("img", { src: imgNas, alt: "NAS Mode", style: { width, height } }));
