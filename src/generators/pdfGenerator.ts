import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { TemplateDesign } from "../templates/templateDesign";
import { TransactionPDFReportType } from "../types";

/**
 * Generates a PDF document based on the provided data and an existing jsPDF document.
 *
 * @param data - The data to be included in the PDF report, including header, body, and footer.
 * @param existingDoc - An optional existing jsPDF document to append the new content to.
 * @returns The generated PDF document as an ArrayBuffer.
 */
export function generatePDF(
  data: TransactionPDFReportType,
  existingDoc: jsPDF
): ArrayBuffer {
  const doc = existingDoc || new jsPDF();
  const design = new TemplateDesign(doc);
  const { header, data: body, footer } = data;

  design.transactionTemplate({
    tableOperator: () => {
      autoTable(doc, {
        head: [header],
        body: body.map((row) => row.map((cell) => cell?.toString())),
        foot: [footer],
        startY: 500,
        didDrawCell: (data) => {
          if (data.section === "body" && data.row.index % 2 === 0) {
            doc.setFillColor(47, 46, 121);
          }
        },
      });
    },
    date: new Date().toLocaleString(),
  });

  return doc.output("arraybuffer");
}