const UNITS = ["", "Α", "Β", "Γ", "Δ", "Ε", "Ϛ", "Ζ", "Η", "Θ"];
const TENS = ["", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ϟ"];
const HUNDREDS = ["", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω", "Ϡ"];

export function toGreekNumeral(n: number): string {
  if (n <= 0 || n > 9999) return String(n);
  const thousands = Math.floor(n / 1000);
  const hundreds = Math.floor((n % 1000) / 100);
  const tens = Math.floor((n % 100) / 10);
  const units = n % 10;

  let result = "";
  if (thousands > 0) result += "͵" + UNITS[thousands];
  result += HUNDREDS[hundreds] + TENS[tens] + UNITS[units];
  return result;
}

export function generateCertificateNumber(completionCount: number): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const seq = String(completionCount).padStart(4, "0");
  const greek = toGreekNumeral(completionCount);
  return `NRL-${yy}${mm}-${seq}-${greek}`;
}
