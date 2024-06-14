import Layout from "components/Layout";
import React, { useEffect, useState } from "react";
import TrainerData from "components/trainer/TrainerData";
import CoursesSectionLevels from "components/CoursesSectionLevels";
import { useDispatch, useSelector } from "react-redux";
import { getTrainerprogrammesList } from "features/trainer";
import { useParams } from "react-router-dom";

const DashboardPage = () => {
    const dispatch = useDispatch()
    const { trainersProgrammes } = useSelector((state) => state.trainer);
    const { id } = useParams();

    const [beginnerPrograms, setBeginnerPrograms] = useState([]);
    const [intermediatePrograms, setIntermediatePrograms] = useState([]);
    const [advancedPrograms, setAdvancedPrograms] = useState([]);

    useEffect(() => {
      dispatch(getTrainerprogrammesList(id));
      
    }, []);
    console.log("Trainer program list : ", trainersProgrammes);
    console.log("beginnerPrograms : ", beginnerPrograms);
    console.log("intermediatePrograms : ", intermediatePrograms);
    console.log("advancedPrograms : ", advancedPrograms);
    const splitPrograms = () => {
      const beginners = trainersProgrammes?.filter(
        (program) => program.level === "Beginner"
      );
      const intermediates = trainersProgrammes?.filter(
        (program) => program.level === "Intermediate"
      );
      const advanceds = trainersProgrammes?.filter(
        (program) => program.level === "Advance"
      );

      setBeginnerPrograms(beginners);
      setIntermediatePrograms(intermediates);
      setAdvancedPrograms(advanceds);
    };

    useEffect(() => {
      splitPrograms();
    }, [trainersProgrammes]);

  return (
    <Layout title="Auth Site | Dashboard" content="Dashboard Page">
      <div className="mx-0 bg-black/95">
        <h2 className="">{console.log("testing inside thr dashboard", trainersProgrammes)}</h2>
        <TrainerData id={id}/>
        <div></div>
        {beginnerPrograms?.length > 0 && <CoursesSectionLevels rowId={1} title={"Beginner"} programs={beginnerPrograms} /> }
        {intermediatePrograms?.length > 0 && <CoursesSectionLevels rowId={2} title={"Intermediate"} programs={intermediatePrograms} /> }
        {advancedPrograms?.length > 0 && <CoursesSectionLevels rowId={3} title={"Advanced"} programs={advancedPrograms} /> }
      </div>
    </Layout>
  );
};

export default DashboardPage;
