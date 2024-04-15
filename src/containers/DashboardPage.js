import Layout from "components/Layout";
import React from "react";
import TrainerData from "components/trainer/TrainerData";
import CoursesSectionLevels from "components/CoursesSectionLevels";

const DashboardPage = () => {
  return (
    <Layout title="Auth Site | Dashboard" content="Dashboard Page">
      <TrainerData />
      <div></div>
      <CoursesSectionLevels key={1} />
      {/* <CoursesSectionLevels key={2}/>
      <CoursesSectionLevels key={3}/> */}
    </Layout>
  );
};

export default DashboardPage;
