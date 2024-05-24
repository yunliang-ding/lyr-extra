import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";
import { Message } from "@arco-design/web-react";

/** 获取元素快照 */
export default (
  element: string
): {
  printImg: any;
  downloadImg: any;
  getDataURL: any;
  copyImg: any;
} => {
  return {
    printImg: useReactToPrint({
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
                    Message.success("已复制");
                  },
                  () => {
                    res(false);
                  }
                );
            } else {
              Message.info("请在安全域名下使用");
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
