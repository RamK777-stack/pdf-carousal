'use client'

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toJpeg } from 'html-to-image';

export default function Home() {

  const downloadImage = () => {
    const elements = document.getElementsByClassName('slide-div');
    const pdf = new jsPDF({ unit: 'px', format: [1080, 1080] }); // use 180 180 for small size
    let promises: Promise<void>[] = [];

    Array.from(elements).forEach((element, index) => {
      // Apply CSS styles to the element
      (element as HTMLElement).style.borderRadius = '0px'; // Just an example, usually you'd want to set a specific background
      const h2 = element.querySelector('h2')
      const h5 = element.querySelector('h5')
      if (h2) {
        h2.style.fontSize = '3rem'
      }
      if (h5) {
        h5.style.fontSize = '1.25rem'
      }

      promises.push(
        toJpeg(element as HTMLElement, { quality: 1, pixelRatio: 3 }) // Adjust options as needed
          .then((dataUrl) => {
            // var link = document.createElement('a');
            // link.download = 'my-image-name.jpeg';
            // link.href = dataUrl;
            // link.click();
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
              debugger
              const imgWidth = 1080;
              const imgHeight = (img.height * imgWidth) / img.width;
              if (index > 0) {
                pdf.addPage();
              }
              pdf.addImage(dataUrl, 'JPEG', 0, 0, imgWidth, imgHeight);
              if (index === elements.length - 1) {
                pdf.save('document.pdf'); // Save or handle the PDF file after last image
              }
            };
          })
          .catch((error) => {
            console.error('Error capturing screenshot:', error);
          })
      );
    });

  }

  return (
    <main className="flex min-h-screen flex-col px-4 py-2 lg:px-24 lg:py-12 bg-slate-200">
      <div className="flex justify-end">
        <button className="bg-blue-200 p-2 space-x-3 space-y-1 rounded"
          onClick={downloadImage}>Download</button>
      </div>
      <div className="grid lg:grid-cols-2 grid-rows-2 px-2 lg:px-10 gap-5" id="grid">
        <div className="h-100 bg-white rounded-md p-4 justify-center">
          <div className='slide-div'>
            <div style={{
              backgroundImage: `url('/assets/bg-5.svg')`,
              backgroundSize: 'cover', // Ensures the background image covers the entire container
              backgroundPosition: 'center', // Centers the background image
            }}
              className="h-full flex flex-col px-2 lg:px-10 space-y-4 text-white justify-center rounded-sm aspect-[1/1] bg-no-repeat">
              <h2 className="text-3xl lg:text-5xl">Exploring Next.js New Features</h2>
              <h5 className="text-xl text-zinc-400">Discover the latest enhancements in Next.js</h5>
            </div>
          </div>
        </div>
        <div className="border border-zinc-300 h-100">Settings</div>
      </div>
    </main>
  );
}
