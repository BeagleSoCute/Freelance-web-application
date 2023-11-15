import React, { useEffect, useState } from "react";
import ContentLayout from "layouts/ContentLayout";
import RequirementForm from "./components/RequirementForm";
import { useParams } from "react-router-dom";
import {
  showProjectDetails,
  updateProjectRequirement,
} from "services/project.service";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { getFormatedDate } from "helpers/date.helper";
import { notification } from "helpers/notification.helper";

const ProjectSection = () => {
  const navigate = useNavigate();
  const { projectID } = useParams();
  const [projectData, setProjectData] = useState();
  const [myRole, setMyRole] = useState("");
  const [isEditRequirement, setIsEditRequirement] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const init = async () => {
      const { success, payload } = await showProjectDetails(projectID);
      if (success) {
        setProjectData(payload.projectDetails);
        setMyRole(payload.myRole);
      }
      console.log(" payload is ", payload.projectDetails);
    };
    init();
  }, []);

  const handleShowContent = () => {
    const isShowContent =
      myRole === "seeker" ||
      ((myRole === "admin" || myRole === "admin") &&
        projectData.status !== "pending");
    if (isShowContent) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmitRequirementForm = async () => {
    const transformData = {
      startDate: getFormatedDate(form.getFieldValue("dueDate")[0]),
      endDate: getFormatedDate(form.getFieldValue("dueDate")[1]),
      requirement: form.getFieldValue("requirement"),
      expectation: form.getFieldValue("expectation"),
      scope: form.getFieldValue("scope"),
      budget: form.getFieldValue("budget"),
    };
    const { success } = await updateProjectRequirement(
      transformData,
      projectID
    );
    if (success) {
      notification({
        type: "success",
        message: "Update the porject requirement success",
      });
      setIsEditRequirement(false);
    } else {
      notification({
        type: "error",
        message: "Update the porject requirement fail, please contract admin!",
      });
    }
  };
  return (
    <div className="project-section">
      <ContentLayout
        isDisable={!isEditRequirement}
        isSubmit={handleShowContent()}
        onSubmit={() => handleSubmitRequirementForm()}
        onCancel={() => navigate("/user-panel")}
      >
        {handleShowContent() === true ? (
          <RequirementForm
            isDisable={!isEditRequirement}
            data={projectData}
            form={form}
          />
        ) : (
          <h1>Please wait the seeker to finish the requirement form </h1>
        )}
      </ContentLayout>
    </div>
  );
};

export default ProjectSection;
