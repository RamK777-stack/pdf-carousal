'use client'

import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import PdfGeneratorSettings from './components/PdfGeneratorSettings';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';

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

export interface Background {
  type: 'solid' | 'gradient' | 'image';
  value: string;
}

const dummySlide: Slide = {
  title: { text: "Enter title", color: '#000000', fontFamily: 'Arial' },
  subtitle: { text: "Subtitle", color: '#000000', fontFamily: 'Arial' },
  content: [{ text: "Your content", color: '#000000', fontFamily: 'Arial' }]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('background');
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [background, setBackground] = useState<Background>({ type: 'solid', value: '#ffffff' });

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

  const addSlide = () => {
    setSlides(prevSlides => [...prevSlides, dummySlide]);
    setCurrentSlideIndex(slides.length);
  };

  const deleteSlide = (index: number) => {
    setSlides(prevSlides => prevSlides.filter((_, i) => i !== index));
    if (currentSlideIndex >= index && currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const onClickSlide = (index: number) => {
    setCurrentSlideIndex(index)
    setActiveTab('text')
  }


  return (
    <main className="flex flex-col min-h-screen px-4 py-2 md:px-6 md:py-2 lg:px-12 lg:py-6 bg-slate-200 justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-2 lg:p-10" id="grid">
        <div className="slide-parent flex flex-col space-y-10 overflow-y-auto bg-white rounded-md p-2 lg:p-4 h-[calc(82vh-2rem)]">
          {slides.map((slide, index) => (
            <div key={index} className="space-y-4">
              <div className="relative">
                <div onClick={() => onClickSlide(index)}>
                  <div className='slide-div'>
                    <div
                      style={{
                        ...(background.type === 'solid' && { backgroundColor: background.value }),
                        ...(background.type === 'gradient' && { backgroundImage: background.value }),
                        ...(background.type === 'image' && {
                          backgroundImage: `url(${background.value})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }),
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => deleteSlide(index)}
                  disabled={slides.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSlide()}
                  className="flex items-center space-x-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add New Slide</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[calc(82vh-2rem)]">
          <PdfGeneratorSettings
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            onClickDownload={downloadImage}
            updateSlideSettings={updateSlideSettings}
            currentSlide={slides[currentSlideIndex]}
            currentSlideIndex={currentSlideIndex}
            updateBackground={setBackground}
          />
        </div>
      </div>
    </main>
  );
}