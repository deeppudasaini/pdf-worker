# pdf-worker-processor

A **PDF generator** that uses Web Workers to handle the PDF generation process efficiently without blocking the main thread. This package is designed to export large datasets or complex document structures in PDF format while keeping your application's UI responsive.

## Key Features

- **Web Worker-powered PDF Generation**: Offload the intensive task of PDF creation to a web worker, ensuring that the UI remains smooth and responsive, even for large data exports.
- **Template-based PDF Design**: Create structured and customizable PDFs using templates. The `TemplateDesign` class allows you to define headers, footers, and other sections with ease.
- **Transaction Report Support**: Predefined transaction PDF templates, complete with headers, data rows, and footers, making it easy to generate financial or transactional reports.
- **Data Chunking for Efficiency**: Large datasets are automatically chunked into manageable sizes using the `chunkArray` utility, allowing for smooth PDF generation, even with huge amounts of data.
- **Progress Tracking**: Real-time progress updates via Web Workers to keep users informed about the export status, ideal for long-running tasks.
- **PDF Customization**: Integrate advanced customization using `jspdf` and `jspdf-autotable`, offering complete control over PDF structure and content.
- **Error Handling**: Built-in error handling and worker termination support to manage errors gracefully and free resources when the task is done.

## Installation

Install the package using npm:

```bash
npm install pdfworker-generator
```


## Usage

Here’s a basic example of how to use `PDFWorker-Generator` to generate a PDF report:

### Basic Example

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary">typescript</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy code</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-typescript">import { PDFWorker, PDFGenerator } from 'pdfworker-generator';

// Sample data for the PDF report
const reportData = {
  header: ['Transaction ID', 'Amount', 'Date'],
  data: [
    ['TXN123', 150.00, new Date()],
    ['TXN124', 200.00, new Date()],
    // ...more data
  ],
  footer: ['Total Transactions', 2],
};

// Initialize the PDF worker
const pdfWorker = new PDFWorker(
  (progress) => console.log(`Progress: ${progress}%`), // Progress callback
  (blobURL) => console.log(`PDF generated: ${blobURL}`), // Completion callback
  (error) => console.error('Error generating PDF:', error), // Error callback
  import.meta.url // Base URL for the web worker
);

// Start processing the data
pdfWorker.processData(reportData);

// Terminate the worker when needed
pdfWorker.terminate();
</code></div></div></pre>

### Advanced Example with PDF Customization

You can customize your PDF by designing templates using the `TemplateDesign` class:

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary">typescript</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy code</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-typescript">import { PDFGenerator } from 'pdfworker-generator';
import jsPDF from 'jspdf';

const customDoc = new jsPDF();

// Custom report data
const reportData = {
  header: ['Product', 'Price', 'Quantity'],
  data: [
    ['Laptop', 999.99, 1],
    ['Phone', 699.99, 2],
    // ...more rows
  ],
  footer: ['Total', 2399.97],
};

// Generate a PDF using the custom data and template
const pdfBuffer = PDFGenerator.generate(reportData, customDoc);

// Save or send the generated PDF buffer</code></div></div></pre>


## API Reference

### Classes

#### `PDFWorker`

* **constructor(updateProgress, onComplete, onError, baseUrl)** : Initializes a web worker for PDF generation.
* `updateProgress`: Function called with progress updates (percentage).
* `onComplete`: Function called when PDF generation is complete.
* `onError`: Function called when an error occurs.
* `baseUrl`: URL for worker setup.
* **processData(data)** : Processes the provided data and starts PDF generation.
* `data`: The transactional data to be exported to PDF, structured as `TransactionPDFReportType`.
* **terminate()** : Terminates the worker once the task is completed or cancelled.

#### `PDFGenerator`

* **static generate(data, existingDoc?)** : Generates a PDF document based on the provided data.
* `data`: The report data to be included in the PDF (`TransactionPDFReportType`).
* `existingDoc`: Optionally provide an existing `jsPDF` instance to append content.

### Interfaces

#### `TransactionPDFReportType`

* `header`: Array of strings representing the header section of the report.
* `data`: 2D array where each sub-array represents a row of data in the report.
* `footer`: Array of strings representing the footer section of the report.

#### `WorkerMessage`

* `status`: Current status of the worker (`processing` or `completed`).
* `progress`: Optional progress percentage.
* `blobURL`: Optional URL of the generated PDF blob.

### Utilities

#### `chunkArray(arr, chunkSize)`

* Splits an array into smaller arrays (chunks) of a specified size.
  * `arr`: The array to split.
  * `chunkSize`: The size of each chunk.

## Dependencies

* [jsPDF](https://github.com/parallax/jsPDF): A library to generate PDFs in JavaScript.
* [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable): Plugin for `jsPDF` to generate tables in PDFs.
