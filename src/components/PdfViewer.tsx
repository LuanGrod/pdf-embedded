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
      try {
        // Importar o PDF.js core
        const pdfjsLib = await import("pdfjs-dist/build/pdf");
        // Configurar o worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

        // Carregar o PDF
        const pdf = await pdfjsLib.getDocument(fileUrl).promise;
        pdfInstance = pdf;

        // Limpa o container antes de renderizar
        containerRef.current.innerHTML = "";

        // Adiciona estilos CSS para a text layer
        addTextLayerCSS();

        // Renderiza todas as páginas
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);

          // Densidade de pixels do dispositivo
          const pixelRatio = window.devicePixelRatio || 1;

          // Calcular escala ideal baseada no container
          const rawViewport = page.getViewport({ scale: 1.0 });
          const containerWidth = containerRef.current.clientWidth || window.innerWidth;
          const scale = Math.max((containerWidth / rawViewport.width) * pixelRatio, 2.0);

          // Viewport com escala calculada
          const viewport = page.getViewport({ scale });

          // Container para cada página
          const pageContainer = document.createElement("div");
          pageContainer.className = "pdf-page";
          pageContainer.style.position = "relative";
          pageContainer.style.width = `100%`;
          pageContainer.style.height = `auto`;
          // pageContainer.style.width = `${viewport.width / pixelRatio}px`;
          // pageContainer.style.height = `${viewport.height / pixelRatio}px`;
          // pageContainer.style.margin = "0 0 10px 0";

          // Canvas para renderização visual
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          canvas.style.width = `100%`;
          canvas.style.height = `auto`;
          // canvas.style.width = `${viewport.width / pixelRatio}px`;
          // canvas.style.height = `${viewport.height / pixelRatio}px`;

          // Adicionar canvas e text layer ao container da página
          pageContainer.appendChild(canvas);

          // Adicionar ao container principal
          containerRef.current.appendChild(pageContainer);

          // Renderizar o canvas (visuals)
          await page.render({
            canvasContext: context,
            viewport: viewport,
            enableWebGL: true,
            renderInteractiveForms: false,
            intent: "print", // Melhor qualidade para textos
          }).promise;
        }
      } catch (error) {
        console.error("Erro ao renderizar o PDF:", error);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    })();

    return () => {
      isCancelled = true;
      if (pdfInstance) pdfInstance.destroy();
    };
  }, [fileUrl]);

  // Função para adicionar os estilos CSS da text layer
  function addTextLayerCSS() {
    if (!document.getElementById("pdf-text-layer-styles")) {
      const style = document.createElement("style");
      style.id = "pdf-text-layer-styles";
      style.textContent = `
        .textLayer {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          opacity: 1.0;
          line-height: 1.0;
          user-select: text;
        }
        
        .textLayer > span, .textLayer > div {
          color: transparent;
          position: absolute;
          white-space: pre;
          cursor: text;
          transform-origin: 0% 0%;
        }
        
        .textLayer ::selection {
          background: rgba(0, 100, 255, 0.3);
        }
        
        /* Para permitir que o texto seja selecionável */
        .textLayer {
          pointer-events: auto;
        }
        
        /* Para compatibilidade com diferentes versões do PDF.js */
        .textLayer span.markedContent {
          top: 0;
          height: 0;
        }
      `;
      document.head.appendChild(style);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      {loading && <div>Carregando PDF...</div>}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      />
    </div>
  );
}
