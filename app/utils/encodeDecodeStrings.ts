export function stringToBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }),
  );
}

export function base64ToString(base64: string) {
  return decodeURIComponent(
    Array.prototype.map
      .call(
        atob(base64),
        (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2),
      )
      .join(""),
  );
}
