import { pdfjs } from 'react-pdf';
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button } from 'flowbite-react';

// set up workder 
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

const PdfViewer = ({path}) => {
    console.log(path)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const goToNextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const goToPrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }

    return (
        <div>
            <Document
                file={path}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
            
            <div className="flex">
                <Button 
                    onClick={goToPrevPage} 
                    disabled={pageNumber < 1}
                    size='sm'
                    className='me-3'
                >
                    Prev Page
                </Button>
                {numPages > 1 && 
                <Button 
                    onClick={goToNextPage} 
                    disabled={pageNumber >= numPages}
                    size='sm'
                >
                    Next Page
                </Button>}
            </div>
        </div>
    );
};

export default PdfViewer;
