import { useEffect, useState } from 'react';
import { formatUnixTimestamp } from '../../utils/dateUtils';

export default function DeploymentList(props) {
  const { id } = props;

  const [deploymentData, setDeploymentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setDeploymentData([]);
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.vercel.com/v2/deployments/${id}/events`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDeploymentData(data);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="">
        {loading && (
          <div className="text-center">
            <div className="text-2xl primary-font mb-4">Loading...</div>
          </div>
        )}

        {!loading && deploymentData.length > 0 && (
          <>
            {deploymentData.map((event, index) => (
              <div className="code-font" key={index}>
                <span className="text-blue-400 pr-2 text-sm inline-block">
                  {formatUnixTimestamp(event.payload.date)}
                </span>
                <span className="text-yellow-300 text-sm inline-block">
                  {event.payload.text}
                </span>
              </div>
            ))}
          </>
        )}

        {!loading && deploymentData.length === 0 && (
          <div className="text-center">
            <div className="text-2xl font-semibold mb-4">No data available</div>
          </div>
        )}
      </div>
    </>
  );
}