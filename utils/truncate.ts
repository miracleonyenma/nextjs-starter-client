/**
 * Options for text truncation
 */
interface TruncateOptions {
  /** String to append when text is truncated (default: '...') */
  ellipsis?: string;
  /** Try to truncate at word boundary (default: true) */
  wordBoundary?: boolean;
  /** Never split words (will return full word) (default: false) */
  preserveWords?: boolean;
  /** Truncate from middle instead of end (for IDs, addresses) (default: false) */
  truncateMiddle?: boolean;
  /** Characters to preserve at start when using truncateMiddle (default: half of maxLength) */
  startChars?: number;
  /** Characters to preserve at end when using truncateMiddle (default: half of maxLength) */
  endChars?: number;
}

/**
 * Truncates text to a specified length and adds an ellipsis if truncated.
 * Supports both end truncation and middle truncation (for IDs, wallet addresses, etc.)
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum length of the returned string (including ellipsis if added)
 * @param options - Configuration options
 * @returns The truncated text
 */
function truncateText(
  text: string | null | undefined,
  maxLength = 10,
  options: TruncateOptions = {
    truncateMiddle: true,
  },
): string {
  // Handle invalid inputs
  if (text === null || text === undefined) {
    return "";
  }

  // Convert to string if needed
  const str = String(text);

  // If maxLength is invalid, return the original string
  if (!Number.isInteger(maxLength) || maxLength <= 0) {
    return str;
  }

  // Set default options
  const {
    ellipsis = "...",
    wordBoundary = true,
    preserveWords = false,
    truncateMiddle = false,
    startChars,
    endChars,
  } = options;

  // If text is already shorter than maxLength, return it as is
  if (str.length <= maxLength) {
    return str;
  }

  // Handle middle truncation (for IDs, wallet addresses, etc.)
  if (truncateMiddle) {
    return truncateMiddleText(str, maxLength, ellipsis, startChars, endChars);
  }

  // Adjust maxLength to account for ellipsis
  const actualMaxLength = maxLength - ellipsis.length;

  // Edge case: if maxLength is very small (smaller than ellipsis)
  if (actualMaxLength <= 0) {
    return ellipsis.substring(0, maxLength);
  }

  // Simple truncation first
  let truncated = str.substring(0, actualMaxLength);

  // Handle word boundary truncation if requested
  if (wordBoundary) {
    // Find the last space within the limit
    const lastSpace = truncated.lastIndexOf(" ");

    if (lastSpace !== -1) {
      // If preserveWords is false, truncate at the last space
      if (!preserveWords) {
        truncated = truncated.substring(0, lastSpace);
      } else {
        // If the next character in original text is a space or doesn't exist, keep the truncation
        // Otherwise, check if we're in the middle of a word
        const nextCharInOriginal = str.charAt(actualMaxLength);
        if (nextCharInOriginal && nextCharInOriginal !== " ") {
          // We're in the middle of a word
          // Find the end of this word
          let endOfWord = str.indexOf(" ", actualMaxLength);
          if (endOfWord === -1) endOfWord = str.length;

          // Calculate new length with full word
          const withFullWord = str.substring(0, endOfWord);

          // If keeping the full word would make the text too long,
          // revert to the last space version
          if (withFullWord.length > maxLength * 1.5) {
            truncated = truncated.substring(0, lastSpace);
          } else {
            // Otherwise include the full word and adjust ellipsis
            return withFullWord;
          }
        }
      }
    }
  }

  // Add ellipsis and return
  return truncated + ellipsis;
}

/**
 * Helper function to truncate text from the middle
 * Useful for IDs, wallet addresses, and other technical strings
 */
function truncateMiddleText(
  text: string,
  maxLength: number,
  ellipsis: string,
  customStartChars?: number,
  customEndChars?: number,
): string {
  // Edge case: if maxLength is smaller than combined length of ellipsis + min 1 char each side
  if (maxLength < ellipsis.length + 2) {
    return ellipsis.substring(0, maxLength);
  }

  const availableChars = maxLength - ellipsis.length;

  // If custom start/end chars are not provided, distribute evenly
  let startChars = customStartChars ?? Math.ceil(availableChars / 2);
  let endChars = customEndChars ?? Math.floor(availableChars / 2);

  // Ensure we don't exceed text length or available chars
  if (startChars + endChars > text.length) {
    // If the distribution would exceed text length, just return the text
    return text;
  }

  // Ensure we don't exceed available chars
  if (startChars + endChars > availableChars) {
    // Reduce proportionally
    const reduceFactor = availableChars / (startChars + endChars);
    startChars = Math.ceil(startChars * reduceFactor);
    endChars = Math.floor(endChars * reduceFactor);
  }

  const startText = text.substring(0, startChars);
  const endText = text.substring(text.length - endChars);

  return startText + ellipsis + endText;
}

// Example usage:
/*
  // Standard truncation
  console.log(truncateText("This is a short text", 10)); // "This is..."
  console.log(truncateText("Short", 10)); // "Short"
  
  // Word boundary options
  console.log(truncateText("This is a sentence with many words", 20, { wordBoundary: true })); // "This is a sentence..."
  console.log(truncateText("ThisIsAReallyLongWordWithoutSpaces", 10)); // "ThisIsARe..."
  console.log(truncateText("One two three", 7, { preserveWords: true })); // "One..."
  
  // Middle truncation (for IDs, addresses)
  console.log(truncateText("0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t", 16, { truncateMiddle: true })); 
  // "0x1a2b...9s0t"
  
  // Custom start/end distribution
  console.log(truncateText("0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t", 12, { 
    truncateMiddle: true,
    startChars: 4,
    endChars: 5
  })); // "0x1a...r9s0t"
  
  // Edge cases
  console.log(truncateText("Test", 2)); // ".."
  console.log(truncateText(null, 10)); // ""
  */

export default truncateText;
