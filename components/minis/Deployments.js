import { useEffect, useState } from 'react';

export default function Deployments(props) {
  const { pid, handleProjectPercentile, handleProjectStatus, handleDeploymentId } = props;

  const [projectDeployments, setProjectDeployments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.vercel.com/v6/deployments?projectId=${pid}&teamId=${process.env.NEXT_PUBLIC_VERCEL_TEAM_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}`,
            },
          }
        );

        if (response.ok) {
          const { deployments } = await response.json();
          setProjectDeployments(deployments);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, [pid]);

  useEffect(() => {
    const readyDeployments = projectDeployments.filter(
      (deployment) => deployment.state === 'READY'
    );

    const percentageReady =
      (readyDeployments.length / projectDeployments.length) * 100;

    handleProjectPercentile(percentageReady);
  }, [projectDeployments, handleProjectPercentile]);

  useEffect(() => {
    if (projectDeployments.length > 0) {
      const firstDeployment = projectDeployments[0];
      handleProjectStatus(firstDeployment.state);
    }
  }, [projectDeployments, handleProjectStatus]);

  return (
    <>
      {projectDeployments && projectDeployments.length > 0 && (
        <>
          {projectDeployments.map((deployment, index) => (
            <div
              onClick={() => handleDeploymentId(deployment)}
              className={`bars flex-1 h-10 rounded hover:opacity-80 cursor-pointer group ${
                deployment.state === 'BUILDING'
                  ? 'bg-yellow-400'
                  : deployment.state === 'ERROR'
                  ? 'bg-red-400'
                  : deployment.state === 'INITIALIZING'
                  ? 'bg-blue-400'
                  : deployment.state === 'QUEUED'
                  ? 'bg-pink-400'
                  : deployment.state === 'READY'
                  ? 'bg-green-400'
                  : deployment.state === 'CANCELED'
                  ? 'bg-gray-400'
                  : ''
              }`}
              key={index}
              data-status={deployment.state}
            />
          ))}
        </>
      )}
    </>
  );
}