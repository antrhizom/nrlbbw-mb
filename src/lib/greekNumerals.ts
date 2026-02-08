// Römische Zahlen (PDF-kompatibel, keine Unicode-Probleme)
const ROMAN_VALUES: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function toRomanNumeral(n: number): string {
  if (n <= 0 || n > 9999) return String(n);
  let result = "";
  let remaining = n;
  for (const [value, numeral] of ROMAN_VALUES) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
}

// Griechische Zahlen (für Anzeige im Browser – Unicode-fähig)
const UNITS = ["", "\u0391", "\u0392", "\u0393", "\u0394", "\u0395", "\u03DA", "\u0396", "\u0397", "\u0398"];
const TENS = ["", "\u0399", "\u039A", "\u039B", "\u039C", "\u039D", "\u039E", "\u039F", "\u03A0", "\u03DE"];
const HUNDREDS = ["", "\u03A1", "\u03A3", "\u03A4", "\u03A5", "\u03A6", "\u03A7", "\u03A8", "\u03A9", "\u03E0"];

export function toGreekNumeral(n: number): string {
  if (n <= 0 || n > 9999) return String(n);
  const thousands = Math.floor(n / 1000);
  const hundreds = Math.floor((n % 1000) / 100);
  const tens = Math.floor((n % 100) / 10);
  const units = n % 10;

  let result = "";
  if (thousands > 0) result += "\u0375" + UNITS[thousands];
  result += HUNDREDS[hundreds] + TENS[tens] + UNITS[units];
  return result;
}

export function generateCertificateNumber(completionCount: number): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const seq = String(completionCount).padStart(4, "0");
  const roman = toRomanNumeral(completionCount);
  return `NRL-${yy}${mm}-${seq}-${roman}`;
}
