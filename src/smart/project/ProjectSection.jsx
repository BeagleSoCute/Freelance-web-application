import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { useNavigate, useParams } from "react-router-dom";
import ProjectInfo from "./components/ProjectInfo";
import ContentLayout from "layouts/ContentLayout";
import isEmpty from "lodash/isEmpty";
import TaskManagementSection from "./components/TaskManagementSection";
import ManageTaskForm from "./components/ManageTaskForm";
import {
  addTask,
  updateTask,
  addProjectComment,
  completeProject,
  requestRejectProject,
} from "services/project.service";
import { notification } from "helpers/notification.helper";
import { categorizeTasks } from "./helpers/index";
import ProjectCommentSection from "./components/ProjectCommentSection";
import { getCurrentDate } from "helpers/date.helper";
import { Flex, Button } from "antd";

const ProjectSection = ({ data }) => {
  const { projectDetail, loading, setProjectDetail, setLoading } =
    useContext(AppContext);
  const [viewTaskData, setViewTaskData] = useState(undefined);
  const [isDisplayTask, setIsDisplayTask] = useState(false);
  const [commentInput, setCommentInput] = useState();
  const [commentList, setCommentList] = useState([]);
  const [myRole, setMyRole] = useState();
  const isDisable =
    projectDetail?.status === "complete" ||
    projectDetail?.status === "reject" ||
    projectDetail?.status === "requestReject";
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
      setCommentList(projectDetail?.comment);
      setMyRole(projectDetail?.myRole);
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
    setIsDisplayTask(true);
    setViewTaskData(data);
  };
  const handleAddComment = async () => {
    const data = {
      comment: commentInput,
      date: getCurrentDate(),
    };
    const { success } = await addProjectComment(data, projectID);
    if (success) {
      notification({
        type: "success",
        message: "Add the comment success",
      });
      navigate(`/landing-project-page/${projectID}`);
    } else {
      notification({
        type: "error",
        message: "Add the comment fail, please contract admin!",
      });
    }
  };
  const handleChangeComment = (e) => {
    setCommentInput(e.target.value);
  };

  const handleIsComplete = () => {
    if (myRole === "seeker" && projectDetail?.isComplete.seeker) {
      return true;
    } else if (
      myRole === "freelancer" &&
      projectDetail?.isComplete.freelancer
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleCompleteProject = async () => {
    const isComplete = !handleIsComplete();
    const { success } = await completeProject(isComplete, projectID);
    if (success) {
      notification({
        type: "success",
        message: "Change the project status success",
      });
      navigate(`/landing-project-page/${projectID}`);
    } else {
      notification({
        type: "error",
        message: "Change the project status fail, please contract admin!",
      });
    }
  };

  const handleRequestRejectProject = async () => {
    const { success } = await requestRejectProject(projectID);
    if (success) {
      notification({
        type: "success",
        message:
          "Request for rejecting the project success, please wait for an admin to review your request",
      });
      navigate(`/landing-project-page/${projectID}`);
    } else {
      notification({
        type: "error",
        message:
          "equest for rejecting the project fail, please contract admin!",
      });
    }
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
            isDisabled={isDisable}
          />
        ) : (
          <>
            <ProjectInfo data={projectDetail} projectID={projectID} />
            <TaskManagementSection
              viewTaskData={viewTaskData}
              tasks={tasks}
              isDisabled={isDisable}
              onOpenTask={() => setIsDisplayTask(true)}
              onView={handleViewTask}
            />
            <ProjectCommentSection
              inputValue={commentInput}
              commentList={commentList}
              onAdd={handleAddComment}
              isDisable={isDisable}
              onChange={handleChangeComment}
            />

            {handleIsComplete() && projectDetail?.status !== "complete" ? (
              <Flex justify="center">
                <p className="alert-text">
                  {projectDetail?.status === "requestReject"
                    ? "Please wait our admin to identify your project"
                    : " You have to wait for your freelancer or seeker to confirm that the project have been completed"}
                </p>
              </Flex>
            ) : (
              ""
            )}
            {isDisable ? (
              ""
            ) : (
              <Flex justify="center" gap="large">
                <Button
                  onClick={() => handleRequestRejectProject()}
                  className="normal-btn"
                  danger
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleCompleteProject()}
                  type="primary"
                  className="normal-btn"
                >
                  {handleIsComplete() ? "Cancel" : "Complete"}
                </Button>
              </Flex>
            )}
          </>
        )}
      </ContentLayout>
    </div>
  );
};

export default ProjectSection;
