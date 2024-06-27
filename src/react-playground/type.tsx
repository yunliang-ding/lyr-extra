import { CSSProperties } from "react";

export interface PlayGroundProps {
  /** 入口文件 */
  code: string;
  /** 依赖 */
  require?: any;
  /** 是否仅预览 */
  previewOnly?: boolean;
  /** 样式 */
  style?: CSSProperties;
  /** 依赖的文件 */
  dependencies?: {
    [key: string]: string;
  };
  /** 是否展示logo */
  showLogo?: boolean;
  /** 是否展示控制台 */
  showConsole?: boolean
}


export default (props: PlayGroundProps) => null;