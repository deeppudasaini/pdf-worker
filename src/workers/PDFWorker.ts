import { WorkerMessage, TransactionPDFReportType } from "../types/index";
import { chunkArray } from "../utils/chunkArray";

export class PDFWorker {
	private worker: Worker;

	constructor(
		private updateProgress: (progress: number) => void,
		private onComplete: (blobURL: string) => void,
		private onError: (error: Error) => void,
		private baseUrl: string
	) {
		this.worker = new Worker(new URL("./pdfWorker.ts", this.baseUrl), {
			type: "module",
		});
		this.setupWorkerHandlers();
	}

	private setupWorkerHandlers() {
		this.worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
			const { status, progress, blobURL } = e.data;

			if (status === "processing" && progress !== undefined) {
				this.updateProgress(progress);
			}

			if (status === "completed" && blobURL) {
				this.onComplete(blobURL);
				this.worker.terminate();
			}
		};

		this.worker.onerror = (error) => {
			this.onError({ message: error.message, stack: "DATA", name: "Error" });
		};
	}

	processData(data: TransactionPDFReportType) {
		const chunkedData = chunkArray(data.data, 1000);
		const totalChunks = chunkedData.length;

		this.worker.postMessage({ data, total: totalChunks });

		return chunkedData;
	}

	terminate() {
		this.worker.terminate();
	}
}
