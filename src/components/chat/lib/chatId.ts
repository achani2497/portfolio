const UUID_TEMPLATE = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

function formatUuid(bytes: Uint8Array): string {
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

function createRandomUuid(): string | null {
  if (
    typeof crypto === "undefined" ||
    typeof crypto.getRandomValues !== "function"
  ) {
    return null;
  }

  return formatUuid(crypto.getRandomValues(new Uint8Array(16)));
}

function createMathRandomUuid(): string {
  return UUID_TEMPLATE.replace(/[xy]/g, (character) => {
    const randomValue = Math.floor(Math.random() * 16);
    const digit = character === "x" ? randomValue : (randomValue & 0x3) | 0x8;
    return digit.toString(16);
  });
}

export function createChatId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return createRandomUuid() ?? createMathRandomUuid();
}
