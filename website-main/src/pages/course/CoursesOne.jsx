import React, { useEffect, useState } from "react";
import CoursesnewSidebar from "./CoursesnewSidebar";
import { Layout } from "../../layouts/Layout";
import TargetJudiciaryCourse from "./TargetJudiciary";
import FoundationCourses from "./FoundationCourse";
import PrelimsTestSeries from "./PrelimsTestSeries";
import MainsTestSeries from "./MainsTestSeries";
import { CoursesAllGrid } from "../../components/courses/CoursesAllGrid";
import OtherCoursesSlider from "./OtherCourses";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState("foundation");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const location = useLocation();
  const state = location.state;

  // console.log("state :", state?.categoryTitle, " Activetab : ", activeTab);

  const titleToTabMap = {
    "Recorded Course": "target",
    "Prelims Test Series": "prelims", // or "mains" if needed
    "Mains Test Series": "mains", // or "mains" if needed
    "Test Series": "mains", // or "mains" if needed
    "Live Course": "foundation",
  };
  useEffect(() => {
    setActiveTab(titleToTabMap[state?.categoryTitle] || "foundation");
  }, [state]);

  const navigate = useNavigate();

  const useNewFilter = Boolean(selectedCategoryId || selectedSubCategoryId);

  const handleGridSelect = (subsubId) => {
    setSelectedCategoryId(null); // optional reset
    setSelectedSubCategoryId(null); // optional reset
    setActiveTab("foundation");
    navigate(`/courses-layout/${subsubId}`);
  };
  // console.log("active tab : ",activeTab)

  const renderContent = () => {
    switch (activeTab) {
      case "target":
        return <TargetJudiciaryCourse />;
      case "prelims":
        return <PrelimsTestSeries />;
      case "mains":
        return <MainsTestSeries />;

      case "foundation":
        return (
          <FoundationCourses
            selectedCategoryId={selectedCategoryId}
            selectedSubCategoryId={selectedSubCategoryId}
            useNewFilter={useNewFilter}
          />
        );
      default:
        return <MainsTestSeries />;
    }
  };

  return (
    <Layout header={9} footer={1}>
      <div className='container-fluid courses-page'>
        <div className='row'>
          <div className='col-md-12'>
            <CoursesAllGrid
              selectedSubCategoryId={selectedSubCategoryId}
              onCategorySelect={handleGridSelect}
            />
          </div>

          <h3 className='text-center fw-bold mb-2 d-none d-sm-block'>
            <span
              style={{ borderBottom: "3px solid red", paddingBottom: "5px" }}
            >
              Explore Our Courses
            </span>
          </h3>

          <div className='col-md-2  sidebar-wrapper'>
            <CoursesnewSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setSelectedCategoryId={setSelectedCategoryId}
              setSelectedSubCategoryId={setSelectedSubCategoryId}
            />
          </div>

          <div className='col-md-9 mx-auto py-4'>
            <div className='row'>{renderContent()}</div>
          </div>

          <div className='col-md-12'>
            <OtherCoursesSlider />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoursesPage;
