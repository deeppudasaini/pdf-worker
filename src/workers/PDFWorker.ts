// src/workers/pdfWorker.ts

/**
 * Creates a web worker for generating PDF documents using jsPDF and jsPDF-AutoTable.
 * 
 * The worker imports jsPDF and jsPDF-AutoTable libraries via CDN and initializes a PDF document.
 * It listens for messages containing chunks of data to be added to the PDF.
 * 
 * The expected message format is:
 * {
 *   chunk: {
 *     header: string[],
 *     data: string[][],
 *     footer: string[]
 *   },
 *   done: boolean
 * }
 * 
 * - `chunk`: Contains the header, body, and footer data for the table to be added to the PDF.
 * - `done`: A boolean indicating whether the PDF generation is complete.
 * 
 * The worker processes each chunk by adding it to the PDF document using the `autoTable` method.
 * Once the `done` flag is received, the worker generates a Blob URL for the PDF and sends it back to the main thread.
 * 
 * The worker sends status messages back to the main thread:
 * - `processing`: When a chunk is being processed.
 * - `completed`: When the PDF generation is complete, along with the Blob URL of the generated PDF.
 * - `error`: If an error occurs during processing, along with the error message.
 * 
 * @returns {Worker} A new web worker instance for generating PDF documents.
 */
export function createPDFWorker() {
  const workerCode = `
    // Import jsPDF and autotable via CDN
    self.importScripts(
      'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js'
    );

    // Initialize PDF document
    let pdfDoc = new jspdf.jsPDF();

    self.onmessage = function(e) {
      const { chunk, done } = e.data;

      try {
        if (chunk) {
          const { header, data: body, footer } = chunk;
          
          pdfDoc.autoTable({
            head: [header],
            body: body.map(row => row.map(cell => cell?.toString())),
            foot: [footer],
            startY: 500,
            didDrawCell: (data) => {
              if (data.section === 'body' && data.row.index % 2 === 0) {
                pdfDoc.setFillColor(47, 46, 121);
              }
            }
          });
          
          self.postMessage({ status: "processing" });
        }

        if (done) {
          const pdfBlob = pdfDoc.output('blob');
          const blobURL = URL.createObjectURL(pdfBlob);
          self.postMessage({ status: "completed", blobURL });
          pdfDoc = new jspdf.jsPDF();
        }
      } catch (error) {
        self.postMessage({ status: "error", error: error.message });
      }
    };
  `;

  const blob = new Blob([workerCode], { type: 'text/javascript' });
  const workerURL = URL.createObjectURL(blob);
  return new Worker(workerURL);
}