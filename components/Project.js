import { useEffect, useState } from 'react';
import Deployments from './minis/Deployments';
import DeploymentList from './minis/DeploymentList';
import WebVitals from './minis/WebVitals';

export default function Project({ data }) {
  const { id, name } = data;

  const [projectStatus, setProjectStatus] = useState('READY');
  const [projectPercentile, setProjectPercentile] = useState(0);
  const [projectColor, setProjectColor] = useState('green');
  const [deploymentDetails, setDeploymentDetails] = useState([]);
  const [showcaseWebVitals, setShowcaseWebVitals] = useState(false);
  const [envDetails, setEnvDetails] = useState([]);
  const [productionDomain, setProductionDomain] = useState('');

  const handleProjectPercentile = (percentage) => {
    setProjectPercentile(percentage);
  };

  const handleProjectStatus = (status) => {
    setProjectStatus(status);
  };

  const handleDeploymentId = (details) => {
    if (details === deploymentDetails) {
      setDeploymentDetails([]);
    } else {
      setDeploymentDetails(details);
    }
  };

  useEffect(() => {
    if (projectStatus === 'BUILDING') {
      setProjectColor('yellow');
    } else if (projectStatus === 'ERROR') {
      setProjectColor('red');
    } else if (projectStatus === 'INITIALIZING') {
      setProjectColor('blue');
    } else if (projectStatus === 'QUEUED') {
      setProjectColor('pink');
    } else if (projectStatus === 'READY') {
      setProjectColor('green');
    } else if (projectStatus === 'CANCELED') {
      setProjectColor('gray');
    } else {
      setProjectColor('green');
    }
  }, [projectStatus]);

  useEffect(() => {
    if (data.env) {
      setEnvDetails(data.env);
    }
  
    const productionDomainRow = envDetails.find(row => row.key === 'PRODUCTION_DOMAIN');
    if (productionDomainRow) {      
      var connectionUrl = `https://api.vercel.com/v1/projects/${data.id}/env/${productionDomainRow.id}?teamId=${process.env.NEXT_PUBLIC_VERCEL_TEAM_ID}`;
  
      fetch(connectionUrl, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}`
        }
      })
      .then(response => response.json())
      .then(jsonData => {
        const productionDomainValue = jsonData.value;
        setProductionDomain(productionDomainValue);
      })
      .catch(error => {
        console.error('Error fetching production domain:', error);
      });
    }
  }, [data.env, data.id, envDetails]);

  const toggleShowcaseWebVitals = () => {
    setShowcaseWebVitals(prevState => !prevState);
  };

  return (
    <>
      <div className={`monitor py-8 bg-${projectColor}-400 bg-opacity-20 border-b-2 border-white mb-8`}>
        <div className="container flex items-center justify-between mb-3">
          <h3 className="text-2xl text-gray-800 primary-font">
            {name}
            { productionDomain &&
              <>
                <button className="inline-block ml-2" title="View Performance Data" onClick={toggleShowcaseWebVitals}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="inline-block w-6 relative -top-[1px] hover:fill-black/60 transition duration-500"><path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zm96 272a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm224-80a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM192 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM384 64a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                </button>
            
                <a href={ productionDomain } title="Open Website to Preview" className="inline-block ml-2 relative top-[4px]" target="_blank" rel="noreferrer">
                  <svg className="w-6 hover:fill-black/60 transition duration-500" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M576 0H96V416H576V0zM512 72v48H256V72H512zM160 64h64v64H160V64zM48 120V96H0v24V488v24H24 456h24V464H456 48V120z"/></svg>
                </a>
              </>
            }            
          </h3>
          <span className={`text-${projectColor}-600 primary-font`}>{projectStatus}</span>
        </div>
        <div className="container bars">
          <div className="flex space-x-px">
            <Deployments
              pid={id}
              handleProjectPercentile={handleProjectPercentile}
              handleProjectStatus={handleProjectStatus}
              handleDeploymentId={handleDeploymentId}
              deploymentDetails={deploymentDetails}
            />
          </div>
        </div>
        <div className="container mt-2">
          <div className="flex items-center">
            <span className={`pr-2 flex-shrink-0 text-${projectColor}-500 text-xs font-semibold`}>Latest Build</span>
            <div className={`h-px bg-${projectColor}-500 w-full`}></div>
            <span className={`px-2 flex-shrink-0 text-${projectColor}-500 text-xs font-semibold`}>{projectPercentile}%</span>
            <div className={`h-px bg-${projectColor}-500 w-full`}></div>
            <span className={`pl-2 flex-shrink-0 text-${projectColor}-500 text-xs font-semibold`}>20 Deployments Ago</span>
          </div>
        </div>

        {deploymentDetails?.uid && (
          <div className="container mx-auto">
            <div className="bg-gray-800 shadow-2xl rounded-lg overflow-hidden mt-6 w-full">
              <div id="code-area" className="py-2 px-6 mt-1 text-white text-base">
                <DeploymentList id={deploymentDetails.uid} />
              </div>
            </div>
          </div>
        )}

        { (productionDomain && showcaseWebVitals) &&
          <>
            <WebVitals domain={ productionDomain } />
          </>
        }
      </div>
    </>
  );
}