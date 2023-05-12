import type { GetStaticProps, NextPage } from "next"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import type { DehydratedState } from "@tanstack/react-query"
import Layout from "components/Layout"
import Hero from "components/Hero"
import FullScreenLayout from "components/FullScreenLayout"
import { getCompanyInfo, companyInfoKey } from "lib/companyInfo"
import { getAllLaunches, getLatestLaunches, launchesKeys } from "lib/launches"
import Card from "components/Card"
import { type } from "os"
import Image from "next/image"
import { useEffect, useState } from "react"
import LaunchCard from "components/LaunchCard"
import CrewCard from "components/CrewCard"
import { Carousel } from "flowbite-react"


type HomeProps = { dehydrated: DehydratedState }

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(companyInfoKey, getCompanyInfo)
  return {
    props: {
      dehydrated: dehydrate(queryClient),
    },
  }
}

const Home: NextPage = () => {

  const [crew, setCrew] = useState<any>([]);

  const dateFormater = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  const { data, isSuccess, isLoading } = useQuery(launchesKeys.latest, getLatestLaunches, {
    notifyOnChangeProps: ["isSuccess", "isLoading", "data"],
  });

  const crewMemberDetails = async (crewMember: any) => {
    return await fetch(`https://api.spacexdata.com/v4/crew/${crewMember}`)
  };

  useEffect(() => {
    if (data) {
      for (let i = 0; i < data.crew.length; i++) {
        crewMemberDetails(data.crew[i]).then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              setCrew((crew: any) => [...crew, data]);
            });
          }
        }
        );
      }
    }
  }, [data]);

  if (isSuccess) {
    return (
      <FullScreenLayout
        className='-mt-16'
        description="Information on everything related with SpaceX: launches, rockets, missions, capsules, payloads, launchpads, Elon Musk's tesla roadster, company info, and more.">
        <Hero title={data.name}
          summary={dateFormater(data.date_utc)}
          children={
            <>
              <p>
                {data.details === null ? 'No details available' : data.details}
              </p>
              <Image
                src={'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png'}
                alt={`${data.name} patch`}
                width={224}
                height={224}
                placeholder='empty'
                decoding='async'
                quality={75} />
              <div className='flex flex-row flex-wrap justify-center'>
                <h2 className="text-2xl font-bold text-center text-light-800 light-mode:text-gray-100 dark-mode:text-gray-100">
                  Crew
                </h2>
              </div>
                <Carousel>
                  {
                    crew.map((crewMember: any) => (
                      <CrewCard
                        key={crewMember.id}
                        name={crewMember.name}
                        agency={crewMember.agency}
                        image={crewMember.image}
                        wikipedia={crewMember.wikipedia}
                        status={crewMember.status}
                      />
                    ))
                  }
                </Carousel>
            </>
          }
        />
      </FullScreenLayout>
    )
  }

  if (isLoading) {
    return (
      <Layout description="Information on everything related with SpaceX: launches, rockets, missions, capsules, payloads, launchpads, Elon Musk's tesla roadster, company info, and more." />
    )
  }

  return null;
}

export default Home;
