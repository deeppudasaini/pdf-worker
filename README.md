

# pdf-worker-processor

`pdf-worker-processor` is a JavaScript library designed to streamline the process of generating large PDF files in the browser efficiently. By utilizing Web Workers and jsPDF, this library handles PDF creation and download without blocking the main thread, allowing for efficient memory management and smooth user experience even when processing extensive data sets.

## Features

- **Web Worker Integration**: Offloads PDF generation to a background worker to improve performance and prevent UI blocking.
- **Chunked Data Processing**: Efficiently processes large datasets by splitting them into manageable chunks.
- **Custom Table Design**: Supports customizable table headers, body content, and footers, allowing for well-structured, stylized PDF documents.
- **Memory Management**: Releases resources after processing to optimize memory usage.
- **Error Handling**: Provides real-time feedback on PDF generation status and handles errors gracefully.

## Installation

To install the `pdf-worker-processor` library, use npm or yarn:

```bash
npm install pdf-worker-processor
# or
yarn add pdf-worker-processor
```


## Usage

### Basic Setup

In your main JavaScript or TypeScript file, import and call the `executePDFGeneratorWorker` function to initiate PDF generation.

#### 1. Import the library

import { executePDFGeneratorWorker } from 'pdf-worker-processor';


#### 2. Prepare your data

Define the structure of your PDF report data using the `TransactionPDFReportType` interface.


import { TransactionPDFReportType } from 'pdf-worker-processor';

const data: TransactionPDFReportType = {
  header: ['Column 1', 'Column 2', 'Column 3'],
  data: [
    ['Row 1 Data 1', 'Row 1 Data 2', 'Row 1 Data 3'],
    // Add more rows as needed
  ],
  footer: ['Footer 1', 'Footer 2', 'Footer 3'],
};



#### 3. Generate and Download the PDF

Use the `executePDFGeneratorWorker` function, passing in the data and the desired filename for the PDF

executePDFGeneratorWorker(data, 'SampleReport.pdf')
  .then(() => console.log('PDF generated and downloaded successfully!'))
  .catch((error) => console.error('PDF generation failed:', error));


### Advanced Configuration

The `pdf-worker-processor` library allows additional customization of the PDF layout, including custom table styling and PDF templating.

#### Template Customization

The library includes a `TemplateDesign` class, which can be used to apply specific design templates for your PDF tables.

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary">typescript</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy code</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-typescript">import { generatePDF, TemplateDesign } from 'pdf-worker-processor';
import jsPDF from 'jspdf';

const doc = new jsPDF();
const design = new TemplateDesign(doc);

design.transactionTemplate({
  tableOperator: () => {
    // Customize table options and layout
  },
  date: new Date().toLocaleString(),
});
</code></div></div></pre>

## API Reference

### `executePDFGeneratorWorker(data: TransactionPDFReportType, fileName: string): Promise<void>`

Initiates PDF generation in a Web Worker, handling large datasets by chunking and efficient memory management.

* **Parameters** :
* `data`: TransactionPDFReportType - Data for the PDF report, including header, body, and footer.
* `fileName`: string - Name of the PDF file to be downloaded.
* **Returns** : `Promise<void>` - Resolves when the PDF is successfully generated and downloaded.

### `generatePDF(data: TransactionPDFReportType, existingDoc?: jsPDF): ArrayBuffer`

Generates a PDF document based on the provided data and optional existing jsPDF instance.

* **Parameters** :
* `data`: TransactionPDFReportType - Data for the PDF report.
* `existingDoc`: jsPDF (optional) - Existing jsPDF document instance for appending content.
* **Returns** : `ArrayBuffer` - PDF content in ArrayBuffer format.

### `TemplateDesign`

Class for creating template designs to apply consistent styles and formatting to the PDF document.

## Error Handling

* **Status Messages** : The worker communicates progress via status messages (`processing`, `completed`, or `error`).
* **Error Messages** : Any issues encountered during processing are sent to the main thread for handling and user notification.

## Example

Below is an example setup that uses `pdf-worker-processor` for generating a large PDF report with customized headers, footers, and efficient background processing:

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary">typescript</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy code</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-typescript">import { executePDFGeneratorWorker } from 'pdf-worker-processor';

const data: TransactionPDFReportType = {
  header: ['ID', 'Name', 'Amount'],
  data: [
    ['1', 'Item A', '10'],
    ['2', 'Item B', '20'],
    // More rows as needed
  ],
  footer: ['Total', '', '30']
};

executePDFGeneratorWorker(data, 'Report.pdf')
  .then(() => console.log('PDF successfully generated!'))
  .catch(error => console.error('Error generating PDF:', error));
</code></div></div></pre>

## Dependencies

* **jsPDF** : A JavaScript library for generating PDF documents.
* **jsPDF-AutoTable** : Extends jsPDF with support for adding tables with custom headers and footers.

## License

This library is MIT licensed.

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary"></div></div></pre>
