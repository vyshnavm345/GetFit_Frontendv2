import Layout from "components/Layout";
import React from "react";
import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
import ProfileHeroSection from "components/ProfileHeroSection";
import Loader2 from "components/Loader2";

const UserProfile = () => {
  const { user, loading, isAuthenticated, message } = useSelector((state) => state.user);


  // if (!isAuthenticated && !loading && user === null){
  //   return <Navigate to='/login' />
  // }

  return (
    <Layout title="Get-Fit | Pofile" content="Profile page">
      {loading || user === null ? (
        <Loader2 />
      ) : (
        <>          
          <ProfileHeroSection user={user} />
        </>
      )}
    </Layout>
  );
};

export default UserProfile;

