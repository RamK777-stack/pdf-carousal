'use client'

import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import PdfGeneratorSettings from './components/PdfGeneratorSettings';
import { useState } from 'react';

export interface TextContent {
  text: string;
  color: string;
  fontFamily: string;
}

export interface Slide {
  title: TextContent;
  subtitle: TextContent;
  content: TextContent[];
}

const initialSlides: Slide[] = [
  {
    title: { text: "Exploring Next.js", color: '#000000', fontFamily: 'Arial' },
    subtitle: { text: "An Overview", color: '#000000', fontFamily: 'Arial' },
    content: [{ text: "An introduction to Next.js", color: '#000000', fontFamily: 'Arial' }]
  },
  {
    title: { text: "Exploring Next.js New Features", color: '#000000', fontFamily: 'Arial' },
    subtitle: { text: "Discover the latest enhancements in Next.js", color: '#000000', fontFamily: 'Arial' },
    content: [
      { text: "Improved Performance", color: '#000000', fontFamily: 'Arial' },
      { text: "New Data Fetching Methods", color: '#000000', fontFamily: 'Arial' },
      { text: "Enhanced Development Experience", color: '#000000', fontFamily: 'Arial' },
      { text: "Optimized Static Site Generation", color: '#000000', fontFamily: 'Arial' },
      { text: "Better Image Optimization", color: '#000000', fontFamily: 'Arial' },
      { text: "Advanced Routing Capabilities", color: '#000000', fontFamily: 'Arial' }
    ]
  },
  // ... (other slides remain the same)
];

export default function Home() {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const downloadImage = async () => {
    const elements = document.getElementsByClassName('slide-div');
    const pdf = new jsPDF({ unit: 'px', format: [540, 540] });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let index = 0; index < elements.length; index++) {
      const element = elements[index] as HTMLElement;
      element.style.borderRadius = '0px';

      try {
        const dataUrl = await toJpeg(element, { quality: 1, pixelRatio: 2 });
        const img = new Image();
        img.src = dataUrl;

        await new Promise<void>((resolve) => {
          img.onload = () => {
            if (index > 0) {
              pdf.addPage([pageWidth, pageHeight], 'p');
            }
            pdf.addImage(dataUrl, 'JPEG', 0, 0, pageWidth, pageHeight);
            resolve();
          };
        });
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    }

    pdf.save('document.pdf');
  }

  const updateSlideSettings = (index: number, section: keyof Slide, field: string, value: string | TextContent[]) => {
    setSlides((prevSlides: Slide[]) => {
      const newSlides = [...prevSlides];
      if (section === 'content') {
        newSlides[index] = {
          ...newSlides[index],
          [section]: value as TextContent[]
        };
      } else {
        newSlides[index] = {
          ...newSlides[index],
          [section]: {
            ...newSlides[index][section],
            [field]: value
          } as TextContent
        };
      }
      return newSlides;
    });
  };

  return (
    <main className="flex flex-col min-h-screen px-4 py-2 md:px-6 md:py-2 lg:px-12 lg:py-6 bg-slate-200 justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-2 lg:p-10" id="grid">
        <div className="slide-parent flex flex-col space-y-10 overflow-y-auto bg-white rounded-md p-2 lg:p-4 h-[calc(82vh-2rem)]">
          {slides.map((slide, index) => (
            <div key={index} onClick={() => setCurrentSlideIndex(index)}>
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
                    <h2
                      className="text-xl lg:text-2xl font-extrabold"
                      style={{
                        color: slide.title.color,
                        fontFamily: slide.title.fontFamily,
                      }}
                    >
                      {slide.title.text}
                    </h2>
                    <h5
                      className="text-lg lg:text-lg mt-1 font-semibold"
                      style={{
                        color: slide.subtitle.color,
                        fontFamily: slide.subtitle.fontFamily,
                      }}
                    >
                      {slide.subtitle.text}
                    </h5>
                    <ul className="space-y-3 mt-4 lg:mt-6">
                      {slide.content.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            color: item.color,
                            fontFamily: item.fontFamily,
                          }}
                        >
                          ➢ {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[calc(82vh-2rem)]">
          <PdfGeneratorSettings
            onClickDownload={downloadImage}
            updateSlideSettings={updateSlideSettings}
            currentSlide={slides[currentSlideIndex]}
            currentSlideIndex={currentSlideIndex}
          />
        </div>
      </div>
    </main>
  );
}