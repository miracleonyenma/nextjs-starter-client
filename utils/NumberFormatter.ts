import { logger } from "@untools/logger";
import { getParamByParam } from "iso-country-currency";

interface FormatCurrencyOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  display?: "code" | "symbol" | "both";
  symbolFirst?: boolean;
}

export function formatCurrency(
  value: number,
  options: FormatCurrencyOptions = {},
): string {
  const {
    currency = "USD",
    locale = "en-US",
    minimumFractionDigits = 2,
    maximumFractionDigits = 5,
    display = "symbol",
    symbolFirst = true,
  } = options;

  try {
    // Format the number first
    const formattedNumber = new Intl.NumberFormat(locale, {
      style: "decimal",
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(value);

    // Get symbol if needed
    let symbol = "";
    if (display === "symbol" || display === "both") {
      try {
        const foundSymbol = getParamByParam("currency", currency, "symbol");
        if (foundSymbol) {
          symbol = foundSymbol;
        }
      } catch {
        // If symbol lookup fails, fall back to code-only display
        return `${currency} ${formattedNumber}`;
      }
    }

    // Return formatted string based on display option
    switch (display) {
      case "symbol":
        return symbol
          ? `${symbol}${formattedNumber}`
          : `${currency} ${formattedNumber}`;
      case "both":
        if (symbol) {
          return symbolFirst
            ? `${symbol} ${formattedNumber} (${currency})`
            : `${currency} ${formattedNumber} (${symbol})`;
        }
        return `${currency} ${formattedNumber}`;
      case "code":
      default:
        return `${currency} ${formattedNumber}`;
    }
  } catch (error) {
    logger.error(error);
    // Ultimate fallback
    return `${currency} ${value.toFixed(minimumFractionDigits)}`;
  }
}
