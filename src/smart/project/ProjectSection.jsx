import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { useNavigate, useParams } from "react-router-dom";
import ProjectInfo from "./components/ProjectInfo";
import ContentLayout from "layouts/ContentLayout";
import isEmpty from "lodash/isEmpty";
import TaskManagementSection from "./components/TaskManagementSection";
import ManageTaskForm from "./components/ManageTaskForm";

const ProjectSection = ({ data }) => {
  const { projectDetail, loading, setProjectDetail } = useContext(AppContext);
  const [isDisplayTask, setIsDisplayTask] = useState(false);
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
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
  const handleAddTask = (data) => {
    setTasks({ ...tasks, [data.progress]: [...tasks[data.progress], data] });
  };
  return (
    <div className="project-section">
      <ContentLayout>
        {isDisplayTask ? (
          <ManageTaskForm
            onClose={() => setIsDisplayTask(false)}
            onSubmit={handleAddTask}
          />
        ) : (
          <>
            <ProjectInfo data={projectDetail} />
            <TaskManagementSection tasks={tasks} onOpenTask={() => setIsDisplayTask(true)} />
          </>
        )}
      </ContentLayout>
    </div>
  );
};

export default ProjectSection;
