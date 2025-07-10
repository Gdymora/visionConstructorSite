const randomStr = (len: number) => {
    const arr = new Uint8Array(len);
    window.crypto.getRandomValues(arr);
    return String.fromCharCode(...toCharCodes(arr));
  }
  
  const toCharCodes = (arr: Uint8Array) => {
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return arr.map(x => validChars.charCodeAt(x % validChars.length));
  }
  
  const sha256 = (message: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return window.crypto.subtle.digest('SHA-256', data);
  }
  
  const bufferToBase64UrlEncoded = (input: ArrayBuffer) => {
    const bytes = new Uint8Array(input);
    return urlEncodeBase64(window.btoa(String.fromCharCode(...bytes)));
  }
  
  const urlEncodeBase64 = (input: string) => {
    const chars = {'+': '-', '/': '_', '=': ''};
    return input.replace(/[\+\/=]/g, m => chars[m]);
  }
  
  (async () => {
    const shaBuffer = await sha256(randomStr(32));
    const encoded = bufferToBase64UrlEncoded(shaBuffer);
    document.getElementById('encoded').textContent = encoded;
  })();