import { from, of } from "rxjs";
import { concatMap, mergeMap } from "rxjs/operators";
import { TransactionPDFReportType } from "../types";
import { createPDFWorker } from "../workers/pdfWorker";
import { chunkArray } from "./arrayUtil";


/**
 * Executes a PDF generation worker to create a PDF report from the provided data.
 *
 * @param data - The data required to generate the PDF report, including the report data, header, and footer.
 * @param fileName - The name of the file to be downloaded once the PDF generation is complete.
 * @returns A promise that resolves when the PDF generation is complete and the file is downloaded, or rejects if an error occurs.
 *
 * The function uses Web Workers to offload the PDF generation process to a background thread. It chunks the data into smaller pieces
 * and sends them to the worker for processing. Once all chunks are processed, the worker sends back a blob URL for the generated PDF,
 * which is then used to download the file.
 *
 * If Web Workers are not supported in the browser, the promise is rejected with an appropriate error message.
 *
 * @throws Will throw an error if Web Workers are not supported in the browser.
 */
export function executePDFGeneratorWorker(
  data: TransactionPDFReportType,
  fileName: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Worker) {
      const worker = createPDFWorker();
      const chunkedData = chunkArray(data.data, 1000);

      worker.postMessage({ data });

      from(chunkedData)
        .pipe(
          concatMap((chunk) =>
            of(chunk).pipe(
              mergeMap((chunk) => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    worker.postMessage({
                      chunk: {
                        data: chunk,
                        header: data.header,
                        footer: data.footer,
                      },
                    });
                    resolve(chunk);
                  }, 0);
                });
              })
            )
          )
        )
        .subscribe({
          complete: () => {
            worker.postMessage({ done: true });
          },
          error: (error) => {
            reject(error);
            worker.terminate();
          },
        });

      worker.onmessage = function (e) {
        const { status, blobURL, error } = e.data;
        
        if (error) {
          reject(new Error(error));
          worker.terminate();
          return;
        }

        if (status === "completed" && blobURL) {
          const link = document.createElement("a");
          link.href = blobURL;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(blobURL);
          worker.terminate();
          resolve();
        }
      };

      worker.onerror = function (error) {
        reject(error);
        worker.terminate();
      };
    } else {
      reject(new Error("Web Workers are not supported in your browser."));
    }
  });
}