import jsPDF from "jspdf";
import { TemplateOptions } from "../types";

/**
 * Represents a template design for generating PDF documents.
 */
export class TemplateDesign {
  /**
   * Creates an instance of TemplateDesign.
   * @param doc - An instance of jsPDF used to generate the PDF document.
   */
  constructor(public doc: jsPDF) {}

  /**
   * Applies a transaction template to the PDF document.
   * @param options - The options for the template, including a table operator function.
   */
  transactionTemplate(options: TemplateOptions) {
    options.tableOperator();
  }
}