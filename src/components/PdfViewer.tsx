"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  fileUrl: string;
};

export default function PdfViewer({ fileUrl }: Props) {
  const containerRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let pdfInstance: any = null;
    let isCancelled = false;

    setLoading(true);

    (async function () {
      const pdfjsLib = await import("pdfjs-dist/build/pdf");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

      try {
        const pdf = await pdfjsLib.getDocument(fileUrl).promise;
        pdfInstance = pdf;

        // Limpa o container antes de renderizar
        containerRef.current.innerHTML = "";

        // Renderiza todas as páginas
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          containerRef.current.appendChild(canvas);

          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    })();

    return () => {
      isCancelled = true;
      if (pdfInstance) pdfInstance.destroy();
    };
  }, [fileUrl]);

  return (
    <div style={{ position: "relative" }}>
      {loading && <div>Carregando PDF...</div>}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      />
    </div>
  );
}
