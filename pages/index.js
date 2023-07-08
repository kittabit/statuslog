import Head from 'next/head';
import { useEffect, useState } from 'react';

import Project from '../components/Project';
import HeaderLayout from '../layouts/Header';
import FooterLayout from '../layouts/Footer';

const STATUS_LEGEND = [
  { color: 'bg-yellow-400', text: 'BUILDING' },
  { color: 'bg-red-400', text: 'ERROR' },
  { color: 'bg-blue-400', text: 'INITIALIZING' },
  { color: 'bg-pink-400', text: 'QUEUED' },
  { color: 'bg-green-400', text: 'READY' },
  { color: 'bg-gray-400', text: 'CANCELED' },
];

export default function Home() {
  const [teamProjects, setTeamProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.vercel.com/v9/projects?teamId=${process.env.NEXT_PUBLIC_VERCEL_TEAM_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}`,
            },
          }
        );

        if (response.ok) {
          const { projects } = await response.json();
          setTeamProjects(projects);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Vercel Client Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="bg-[#FEFEFE]/20">
        <HeaderLayout />

        <main>
          <div className="container mx-auto mb-6">
            <h3 className="text-lg tracking-wide text-gray-800 font-semibold uppercase mb-2">Legend:</h3>

            <div className="grid grid-cols-3 gap-4">
              {STATUS_LEGEND.map((legendItem, index) => (
                <div key={index} className="grid grid-cols-5">
                  <div className={legendItem.color}></div>
                  <div className="pl-2 col-span-4">{legendItem.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="monitors border-t-2 border-white">
            {teamProjects &&
              teamProjects.length > 0 &&
              teamProjects.map((project, index) => <Project key={index} data={project} />)}
          </div>
        </main>

        <FooterLayout />
      </div>
    </>
  );
}