import autoprefixer from 'autoprefixer';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

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
            <p className="text-center mb-6">Coming Soon.</p>

            <h2 className="text-center text-gray-800 primary-font text-2xl mb-2">Lighthouse Results</h2>
            { webVitalsLoading ? (
                <>
                    <div className="text-center w-full">
                        <svg className="w-12 h-12 animate-spin text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
