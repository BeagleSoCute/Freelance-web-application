import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { useNavigate, useParams } from "react-router-dom";
import ProjectInfo from "./components/ProjectInfo";
import ContentLayout from "layouts/ContentLayout";
import isEmpty from "lodash/isEmpty";
import TaskManagementSection from "./components/TaskManagementSection";

const ProjectSection = ({ data }) => {
  const { projectDetail, loading, setProjectDetail } = useContext(AppContext);
  const { projectID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      if (isEmpty(projectDetail) && !loading) {
        navigate(`/landing-project-page/${projectID}`);
        return;
      }
    };
    init();
  }, [loading]);
  return (
    <div className="project-section">
      <ContentLayout>
        <ProjectInfo data={projectDetail} />
        <TaskManagementSection />
      </ContentLayout>
    </div>
  );
};

export default ProjectSection;
