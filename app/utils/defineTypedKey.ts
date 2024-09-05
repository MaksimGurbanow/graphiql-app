export function formatValue(value: string = "", key: string = ""): string {
  if (key === "Backspace") {
    return value.slice(0, value.length - 1);
  }
  return /^[a-zA-Z]$/.test(key) ? value + key : value;
}
