/**
 * Represents the structure of a transaction PDF report.
 */
export interface TransactionPDFReportType {
  /**
   * The header section of the PDF report, consisting of an array of strings.
   */
  header: Array<string>;

  /**
   * The main data section of the PDF report, consisting of an array of arrays.
   * Each inner array can contain strings, numbers, or dates.
   */
  data: Array<Array<string | number | Date>>;

  /**
   * The footer section of the PDF report, consisting of an array of strings.
   */
  footer: Array<string>;
}
  
  /**
   * Interface representing the options for a template.
   */
  export interface TemplateOptions {
    /**
     * The date associated with the template.
     */
    date: string;

    /**
     * A function that operates on a table.
     */
    tableOperator: () => void;
  }