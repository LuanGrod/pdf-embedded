import Nav from "@/components/Nav";
import PdfViewer from "@/components/PdfViewer";

const Pdf = () => {
  return (
    <>
      <Nav />
      <main className="min-h-full">
        <PdfViewer fileUrl="/sample4.pdf" />
      </main>
    </>
  );
};

export default Pdf;
