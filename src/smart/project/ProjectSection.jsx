import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { useNavigate, useParams } from "react-router-dom";
import ProjectInfo from "./components/ProjectInfo";
import ContentLayout from "layouts/ContentLayout";
import isEmpty from "lodash/isEmpty";
import TaskManagementSection from "./components/TaskManagementSection";
import ManageTaskForm from "./components/ManageTaskForm";
import { addTask, updateTask } from "services/project.service";
import { notification } from "helpers/notification.helper";
import { categorizeTasks} from "./helpers/index";

const ProjectSection = ({ data }) => {
  const { projectDetail, loading, setProjectDetail, setLoading } =
    useContext(AppContext);
  const [viewTaskData, setViewTaskData] = useState(undefined);
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
      setTasks(categorizeTasks(projectDetail?.task));
    };
    init();
  }, [loading]);
  const handleAddTask = async (data) => {
    setLoading(true);
    const success = await addTask(data, projectID);
    setLoading(false);
    if (success) {
      notification({ type: "success", message: "Add the task Success" });
      navigate(`/landing-project-page/${projectID}`);
    } else {
      notification({
        type: "error",
        message: "Can not add a task, please contract admin!",
      });
    }
  };

  const handleEditTask = async (data) => {
    setLoading(true);
    const success = await updateTask(data, projectID);
    setLoading(false);
    if (success) {
      notification({ type: "success", message: "Update the task Success" });
      navigate(`/landing-project-page/${projectID}`);
    } else {
      notification({
        type: "error",
        message: "Can not update the task, please contract admin!",
      });
    }
  };

  const handleViewTask = (data) => {
    console.log("dataisssd", data);
    setIsDisplayTask(true);
    setViewTaskData(data);
  };
  return (
    <div className="project-section">
      <ContentLayout>
        {isDisplayTask ? (
          <ManageTaskForm
            viewTaskData={viewTaskData}
            onClose={() => {
              setIsDisplayTask(false);
              setViewTaskData(undefined);
            }}
            onSubmit={handleAddTask}
            onEdit={handleEditTask}
          />
        ) : (
          <>
            <ProjectInfo data={projectDetail} />
            <TaskManagementSection
              viewTaskData={viewTaskData}
              tasks={tasks}
              onOpenTask={() => setIsDisplayTask(true)}
              onView={handleViewTask}
            />
          </>
        )}
      </ContentLayout>
    </div>
  );
};

export default ProjectSection;
