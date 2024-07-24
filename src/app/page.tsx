'use client'

import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import PdfGeneratorSettings from './components/PdfGeneratorSettings';

export default function Home() {

  const downloadImage = async () => {
    debugger
    const elements = document.getElementsByClassName('slide-div');
    const pdf = new jsPDF({ unit: 'px', format: [540, 540] });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let index = 0; index < elements.length; index++) {
      const element = elements[index] as HTMLElement;

      // Remove border radius for clean export
      element.style.borderRadius = '0px';

      try {
        const dataUrl = await toJpeg(element, { quality: 1, pixelRatio: 2 });
        const img = new Image();
        img.src = dataUrl;

        await new Promise((resolve) => {
          img.onload = () => {
            if (index > 0) {
              pdf.addPage([pageWidth, pageHeight], 'p');
            }

            // Adjust image dimensions to fit within the page
            pdf.addImage(dataUrl, 'JPEG', 0, 0, pageWidth, pageHeight);
            resolve(null);
          };
        });
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    }

    pdf.save('document.pdf');
  }

  const slides = [
    {
      title: "Exploring Next.js",
      subtitle: "An Overview",
      points: []
    },
    {
      title: "Exploring Next.js New Features",
      subtitle: "Discover the latest enhancements in Next.js",
      points: [
        "Improved Performance",
        "New Data Fetching Methods",
        "Enhanced Development Experience",
        "Optimized Static Site Generation",
        "Better Image Optimization",
        "Advanced Routing Capabilities"
      ]
    },
    {
      title: "Next.js Performance Boost",
      subtitle: "How Next.js improves application performance",
      points: [
        "Automatic Code Splitting",
        "Server-Side Rendering",
        "Static Site Generation",
        "Incremental Static Regeneration",
        "Efficient Image Loading",
        "Optimized Build Size"
      ]
    },
    {
      title: "Next.js Data Fetching",
      subtitle: "Modern ways to fetch data in Next.js",
      points: [
        "getStaticProps",
        "getServerSideProps",
        "getStaticPaths",
        "API Routes",
        "Dynamic Imports",
        "SWC for Fast Refresh"
      ]
    },
    {
      title: "Next.js Development Experience",
      subtitle: "Tools and features for developers",
      points: [
        "Fast Refresh",
        "TypeScript Support",
        "Customizable Babel Config",
        "Integrated ESLint",
        "File-System Routing",
        "Hot Module Replacement"
      ]
    },
    {
      title: "Next.js Deployment",
      subtitle: "Deploying Next.js applications",
      points: [
        "Vercel Integration",
        "Serverless Functions",
        "Static Export",
        "Multi-Zone Support",
        "Environment Variables",
        "Custom Server Support"
      ]
    },
    {
      title: "Conclusion",
      subtitle: "Key Takeaways",
      points: [
        "Next.js provides advanced features and performance enhancements.",
        "It offers multiple data fetching methods tailored for different needs.",
        "Development experience is significantly improved with built-in tools.",
        "Deployment is seamless with integrations like Vercel.",
        "Next.js is a powerful framework for building modern web applications."
      ]
    }
  ];

  return (
    <main className="flex flex-col min-h-screen px-4 py-2 md:px-6 md:py-2 lg:px-12 lg:py-6 bg-slate-200 justify-center">
      {/* <div className="flex justify-end">
        <button className="bg-blue-200 p-2 space-x-3 space-y-1 rounded cursor-pointer"
          onClick={downloadImage}>Download</button>
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-2 lg:p-10" id="grid">
        <div className="slide-parent flex flex-col space-y-10 overflow-y-auto bg-white rounded-md p-2 lg:p-4 h-[calc(82vh-2rem)]">
          {slides.map((slide, index) => (
            <div key={index}>
              <div className='slide-div'>
                <div
                  style={{
                    backgroundImage: `url('/assets/new-book.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  className="h-[80vh] lg:h-[70vh] flex flex-col px-4 lg:px-8 text-black justify-center rounded-sm bg-no-repeat text-xs lg:text-base"
                >
                  <div className='flex flex-col justify-center p-10 h-full'>
                    <h2 className="text-xl lg:text-2xl text-[#333333] font-serif font-extrabold">{slide.title}</h2>
                    <h5 className="text-lg lg:text-lg text-[#333333] mt-1 font-serif font-semibold">{slide.subtitle}</h5>
                    <ul className="space-y-3 mt-4 lg:mt-6 text-[#333333] font-serif">
                      {slide.points.map((point, idx) => (
                        <li key={idx}>➢ {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[calc(82vh-2rem)]">
          <PdfGeneratorSettings />
        </div>
      </div>
    </main>
  );
}
