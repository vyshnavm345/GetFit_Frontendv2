import Layout from 'components/Layout'
import CourseDescription from 'components/courses/CourseDescription';
import React from 'react'

const ProgramDetails = () => {
  return (
    <>
      <Layout title="Auth Site | Dashboard" content="Dashboard Page">
        <CourseDescription/>
      </Layout>
    </>
  );
}

export default ProgramDetails