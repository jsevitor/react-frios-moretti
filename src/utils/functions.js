/**
 * Formata um valor numérico para o formato de moeda especificado.
 *
 * @param {number} value - O valor numérico a ser formatado.
 * @param {string} [locale="pt-BR"] - O local para formatação (padrão: "pt-BR").
 * @param {string} [currency="BRL"] - A moeda a ser usada na formatação (padrão: "BRL").
 * @returns {string} - O valor formatado como moeda.
 *
 * @example
 * formatCurrency(1000); // "R$ 1.000,00"
 * formatCurrency(1000, "en-US", "USD"); // "$1,000.00"
 */
export function formatCurrency(value, locale = "pt-BR", currency = "BRL") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

/**
 * Converte uma string de data no formato "YYYY-MM-DD" para "DD/MM/YYYY".
 *
 * @param {string} dateString - A data no formato "YYYY-MM-DD".
 * @returns {string} - A data formatada no padrão brasileiro "DD/MM/YYYY".
 *
 * @example
 * formatDate("2024-02-19"); // "19/02/2024"
 */
export function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

/**
 * Converte uma string de data ISO para o formato "DD/MM/YYYY".
 *
 * @param {string} isoString - A string de data no formato ISO (ex: "2024-02-19T12:00:00Z").
 * @returns {string} - A data formatada no padrão "DD/MM/YYYY".
 *
 * @example
 * formatCustomDate("2024-02-19T12:00:00Z"); // "19/02/2024"
 */
export function formatCustomDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Os meses são de 0 a 11
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
