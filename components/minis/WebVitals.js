import autoprefixer, { data } from 'autoprefixer';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

export default function WebVitals( props ) {
  const domain = props.domain;  

  const [webVitalsLoading, setWebVitalsLoading] = useState(true);
  const [webVitalsData, setWebVitalsData] = useState([]);

  useEffect(() => {
    const fetchWebVitalsData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
        const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${domain}&key=${apiKey}`;
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setWebVitalsData(data);
          setWebVitalsLoading(false);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchWebVitalsData();
  }, [domain]);

  useEffect(() => {
    console.table(webVitalsData);
  }, [webVitalsData]);

  const includedAuditMetricIds = [
    'first-contentful-paint',
    'largest-contentful-paint-element',
    'total-blocking-time',
    'cumulative-layout-shift',
    'speed-index',
  ];

  const includedAuditIds = [
    'bootup-time',
    'server-response-time',
    'cumulative-layout-shift',
    'mainthread-work-breakdown',
    'interactive',
    'dom-size',
    'uses-responsive-images',
    'bootup-time',
    'modern-image-formats',
    'layout-shift-elements',
    'largest-contentful-paint-element',
    'total-byte-weight',
    'max-potential-fid',
    'total-blocking-time',
    'largest-contentful-paint',
    'first-meaningful-paint',
    'offscreen-images',
    'first-contentful-paint',
    'speed-index',
  ];

  return (
    <>
      <div className="container mx-auto mt-4">
        <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-center text-gray-800 primary-font text-2xl mb-2">Core Web Vitals</h2>
            <div className="">
              { webVitalsLoading ? (
                <>
                    <div className="text-center w-full">
                        <svg className="inline-block w-12 h-12 animate-spin text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M7.9342 16.0659L6.87354 17.1265" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M7.9342 7.93413L6.87354 6.87347" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </div>                
                </>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-4">

                    <div className="col-span-1 max-h-[400px] overflow-hidden">
                    { (webVitalsData && webVitalsData.lighthouseResult && webVitalsData.lighthouseResult.fullPageScreenshot && webVitalsData.lighthouseResult.fullPageScreenshot.screenshot) &&
                      <>                      
                      <Image src={ webVitalsData.lighthouseResult.fullPageScreenshot.screenshot.data } width="250" height="250" className="object-cover w-full" />
                      </>
                    }
                    </div>

                    <div className="col-span-2 grid grid-cols-3 gap-4">
                    { (webVitalsData && webVitalsData.loadingExperience && typeof webVitalsData.loadingExperience.metrics && webVitalsData.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE) &&
                      <>
                        <div className="col-span-1">
                          <span className="block text-gray-800 primary-font text-base font-bold">
                            Cumulative Layout Shift
                          </span>
                          <em className={`block primary-font text-lg ${
                            webVitalsData.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category == "FAST"
                              ? 'text-green-500'
                              : webVitalsData.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category == "AVERAGE"
                              ? 'text-orange-500'
                              : 'text-red-500'
                          }`}>
                            { webVitalsData.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile }ms
                          </em>
                          <span className="block primary-font text-base text-left">
                            { webVitalsData.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category }
                          </span>
                        </div>
                      </>
                    }

                    { (webVitalsData && webVitalsData.loadingExperience && typeof webVitalsData.loadingExperience.metrics && webVitalsData.loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE) &&
                      <>
                        <div className="col-span-1">
                          <span className="block text-gray-800 primary-font text-base font-bold">
                            Time to First Byte
                          </span>
                          <em className={`block primary-font text-lg ${
                            webVitalsData.loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.category == "FAST"
                              ? 'text-green-500'
                              : webVitalsData.loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.category == "AVERAGE"
                              ? 'text-orange-500'
                              : 'text-red-500'
                          }`}>
                            { webVitalsData.loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.percentile }ms
                          </em>
                          <span className="block primary-font text-base text-left">
                            { webVitalsData.loadingExperience.metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE.category }
                          </span>
                        </div>
                      </>
                    }


                    { (webVitalsData && webVitalsData.loadingExperience && typeof webVitalsData.loadingExperience.metrics && webVitalsData.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS) &&
                      <>
                        <div className="col-span-1">
                          <span className="block text-gray-800 primary-font text-base font-bold">
                            First Contentful Paint
                          </span>
                          <em className={`block primary-font text-lg ${
                            webVitalsData.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category == "FAST"
                              ? 'text-green-500'
                              : webVitalsData.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category == "AVERAGE"
                              ? 'text-orange-500'
                              : 'text-red-500'
                          }`}>
                            { webVitalsData.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile }ms
                          </em>
                          <span className="block primary-font text-base text-left">
                            { webVitalsData.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category }
                          </span>
                        </div>
                      </>
                    }


                    { (webVitalsData && webVitalsData.loadingExperience && typeof webVitalsData.loadingExperience.metrics && webVitalsData.loadingExperience.metrics.FIRST_INPUT_DELAY_MS) &&
                      <>
                        <div className="col-span-1">
                          <span className="block text-gray-800 primary-font text-base font-bold">
                            First Input Delay
                          </span>
                          <em className={`block primary-font text-lg ${
                            webVitalsData.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category == "FAST"
                              ? 'text-green-500'
                              : webVitalsData.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category == "AVERAGE"
                              ? 'text-orange-500'
                              : 'text-red-500'
                          }`}>
                            { webVitalsData.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile }ms
                          </em>
                          <span className="block primary-font text-base text-left">
                            { webVitalsData.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category }
                          </span>
                        </div>
                      </>
                    }


                    { (webVitalsData && webVitalsData.loadingExperience && typeof webVitalsData.loadingExperience.metrics && webVitalsData.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT) &&
                      <>
                        <div className="col-span-1">
                          <span className="block text-gray-800 primary-font text-base font-bold">
                            Interaction to Next Paint
                          </span>
                          <em className={`block primary-font text-lg ${
                            webVitalsData.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.category == "FAST"
                              ? 'text-green-500'
                              : webVitalsData.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.category == "AVERAGE"
                              ? 'text-orange-500'
                              : 'text-red-500'
                          }`}>
                            { webVitalsData.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.percentile }ms
                          </em>
                          <span className="block primary-font text-base text-left">
                            { webVitalsData.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.category }
                          </span>
                        </div>
                      </>
                    }


                    { (webVitalsData && webVitalsData.loadingExperience && typeof webVitalsData.loadingExperience.metrics && webVitalsData.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS) &&
                      <>
                        <div className="col-span-1">
                          <span className="block text-gray-800 primary-font text-base font-bold">
                            Largest Contentful Paint
                          </span>
                          <em className={`block primary-font text-lg ${
                            webVitalsData.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.category == "FAST"
                              ? 'text-green-500'
                              : webVitalsData.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.category == "AVERAGE"
                              ? 'text-orange-500'
                              : 'text-red-500'
                          }`}>
                            { webVitalsData.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile }ms
                          </em>
                          <span className="block primary-font text-base text-left">
                            { webVitalsData.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.category }
                          </span>
                        </div>
                      </>
                    }
                    </div>

                  </div>
                </>
              )}
            </div>

            <hr className="mt-8 mb-8" />

            <h2 className="text-center text-gray-800 primary-font text-2xl mb-2">Lighthouse Results</h2>
            { webVitalsLoading ? (
                <>
                    <div className="text-center w-full">
                        <svg className="inline-block w-12 h-12 animate-spin text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M7.9342 16.0659L6.87354 17.1265" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M7.9342 7.93413L6.87354 6.87347" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </div>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-3 gap-4">                        
                        {webVitalsData && webVitalsData.lighthouseResult && typeof webVitalsData.lighthouseResult.audits === 'object' ? (
                            Object.keys(webVitalsData.lighthouseResult.audits)
                                .filter((auditKey) => includedAuditMetricIds.includes(auditKey))
                                .map((auditKey, index) => {
                                    const audit = webVitalsData.lighthouseResult.audits[auditKey];                                    
                                    return (
                                        <div className="col-span-1" key={index} data-gid={ audit.id }>
                                            <span className="block text-gray-800 primary-font text-xl">{audit.title}</span>
                                            <span className="text-lg">{audit.displayValue}</span>
                                            <p className="text-sm">
                                                <ReactMarkdown>{audit.description}</ReactMarkdown>
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                            <p>No audits data available</p>
                        )}
                    </div>
                </>
            )}
        </div>
      </div>
    </>
  );
}
