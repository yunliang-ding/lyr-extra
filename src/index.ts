import * as _BigNumber from "bignumber.js";
import html2canvas from "html2canvas";
import { Message, Notification } from "@arco-design/web-react";

const ReactToPrint = require("react-to-print");

const BigNumberjs: any = _BigNumber;

const calculate: any = (
  args: any[],
  type: "plus" | "minus" | "multipliedBy" | "dividedBy"
) => {
  return Number(
    args
      .reduce((a, b) => {
        return new BigNumberjs(a)[type](new BigNumberjs(b));
      })
      .toString()
  );
};

export const encode = (str: string): string => {
  try {
    return btoa(encodeURIComponent(str));
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const decode = (str: string): string => {
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    console.log(error);
    return "";
  }
};

/** 浮点数运算 */
export const BigNumber = {
  /** 加 */
  add: (...args: any[]) => calculate(args, "plus"),
  /** 减 */
  minus: (...args: any[]) => calculate(args, "minus"),
  /** 乘 */
  multiplie: (...args: any[]) => calculate(args, "multipliedBy"),
  /** 除 */
  divided: (...args: any[]) => calculate(args, "dividedBy"),
};

/** 判断空 */
export const isEmpty = (param: any) => {
  if (param === null || param === undefined) {
    return true;
  }
  if (Array.isArray(param)) {
    return param.length === 0;
  }
  if (typeof param === "string") {
    return param.trim() === "";
  }
  if (typeof param === "object") {
    return Object.keys(param).length === 0;
  }
  return false;
};
/**
 * 简易uuid
 */
export const uuid = (size: number) => {
  return Math.random()
    .toString(16)
    .substring(2, size + 2);
};

/** 千分位，小数点2位 */
export const NumberFormat = (
  number: any,
  options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
) => {
  if (isNaN(Number.parseFloat(number))) {
    return "-";
  }
  return Number(number).toLocaleString("zh-CH", options);
};

/** 解析url参数 */
export const getUrlSearchParams = (search = "") => {
  search = search?.split("?")[1];
  const params: any = {};
  const searchParams: any = new URLSearchParams(search);
  searchParams.forEach((value: any, key: string) => {
    params[key] = value;
  });
  return params;
};
/** 文件下载 */
export const downloadFile = (url: string, fileName: string) => {
  return new Promise((res) => {
    const x = new XMLHttpRequest();
    x.open("GET", url, true);
    x.responseType = "blob";
    x.onload = () => {
      const loadurl = window.URL.createObjectURL(x.response);
      const a = document.createElement("a");
      a.href = loadurl;
      a.download = fileName;
      a.click();
      res(true);
    };
    x.send();
  });
};
/** 拷贝到剪切板 */
export const copyToClipBoard = async (text: string) => {
  /** navigator clipboard 需要https等安全上下文 */
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    Message.success("已复制到剪切板");
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // 解决跳动问题
    textArea.style.opacity = "0";
    textArea.style.display = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const res = await new Promise((resolve, reject) => {
      document.execCommand("copy") ? resolve(true) : reject();
      textArea.remove();
    });
    if (res) {
      Message.success("已复制到剪切板");
    }
  }
};

/** 获取元素快照 */
export const getElementSnapshot = (
  element: string
): {
  printImg: any;
  downloadImg: any;
  getDataURL: any;
  copyImg: any;
} => {
  return {
    printImg: ReactToPrint.useReactToPrint({
      bodyClass: "print-class",
      content: () => document.querySelector(element),
    }),
    copyImg: () => {
      const el: any = document.querySelector(element);
      return new Promise((res) => {
        html2canvas(el, {
          useCORS: true,
        }).then((canvas) => {
          canvas.toBlob(async (blob) => {
            // 将blob对象放入剪切板item中
            const type: any = blob?.type;
            if (navigator.clipboard) {
              await navigator.clipboard
                .write([new ClipboardItem({ [type]: blob } as any)])
                .then(
                  () => {
                    res(true);
                    Notification.success({
                      title: "提示",
                      content: "已保存到粘贴板",
                    });
                  },
                  () => {
                    res(true);
                    Notification.warning({
                      title: "提示",
                      content: "保存截图失败",
                    });
                  }
                );
            } else {
              Message.error("请在安全域名下使用");
              res(true);
            }
          }, "image/png");
        });
      });
    },
    // 直接下载
    downloadImg: (filename: string) => {
      return new Promise((res) => {
        html2canvas(document.querySelector(element) as any, {
          useCORS: true,
        }).then((canvas) => {
          document.documentElement.classList.remove("html2canvas");
          const a = document.createElement("a");
          a.download = filename;
          a.href = canvas.toDataURL();
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          res(true);
        });
      });
    },
    getDataURL: async () => {
      return new Promise((res) => {
        html2canvas(document.querySelector(element) as any, {
          useCORS: true,
        }).then((canvas) => {
          res(canvas.toDataURL());
        });
      });
    },
  };
};

export { default as CheckAppVersion } from "./check-app-version";

export { default as ConsoleRender } from "./console-render";

export { default as usePureRequest } from "./hooks/usePureRequest";

export { default as docxReplace } from "./docx-replace";

export { default as docxReplaceBatch } from "./docx-replace";

export { default as babelParse } from "./babel-parse";

export { default as babelParseCode } from "./babel-parse/parse";

export { default as MarkdownViewer } from "./markdown-viewer";
