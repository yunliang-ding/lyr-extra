/** 拷贝到剪切板 */
export default async (text: string) => {
  /** navigator clipboard 需要https等安全上下文 */
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
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
  }
};
