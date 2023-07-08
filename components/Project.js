import { useEffect, useState } from 'react';
import Deployments from './minis/Deployments';
import DeploymentList from './minis/DeploymentList';

export default function Project({ data }) {
  const { id, name } = data;

  const [projectStatus, setProjectStatus] = useState('READY');
  const [projectPercentile, setProjectPercentile] = useState(0);
  const [projectColor, setProjectColor] = useState('green');
  const [deploymentDetails, setDeploymentDetails] = useState([]);

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

  return (
    <>
      <div className={`monitor py-8 bg-${projectColor}-400 bg-opacity-20 border-b-2 border-white mb-8`}>
        <div className="container flex items-center justify-between mb-3">
          <h3 className="text-2xl text-gray-800 primary-font">{name}</h3>
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
          <div className="container mx-auto bg-gray-800 shadow-2xl rounded-lg overflow-hidden mt-6 max-w-[95%]">
            <div id="code-area" className="py-4 px-4 mt-1 text-white text-xl">
              <DeploymentList id={deploymentDetails.uid} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}