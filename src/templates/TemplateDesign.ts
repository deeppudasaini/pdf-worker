import jsPDF from "jspdf";
import { TemplateOptions } from "../types/index";
// Templates will be add later
/**
 * Class representing a template design for a PDF document.
 */
export class TemplateDesign {
	/**
	 * Creates an instance of TemplateDesign.
	 * @param doc - The jsPDF document instance.
	 */
	constructor(public doc: jsPDF) {}

	/**
	 * Generates a transaction template in the PDF document.
	 * @param options - The options for the transaction template.
	 */
	transactionTemplate(options: TemplateOptions) {
	}
}
