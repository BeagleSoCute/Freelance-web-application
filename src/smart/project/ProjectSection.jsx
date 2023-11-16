import React, { useEffect, useState } from "react";
import ContentLayout from "layouts/ContentLayout";
import RequirementForm from "./components/RequirementForm";
import { useParams } from "react-router-dom";
import {
  showProjectDetails,
  updateProjectRequirement,
  updateNegotiationComment,
  freelancerApproveRequirement,
} from "services/project.service";
import { Form, Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { getFormatedDate, parseFormattedDate } from "helpers/date.helper";
import { notification } from "helpers/notification.helper";
import DiscussionSection from "./components/DiscussionSection";
import { getCurrentDate } from "helpers/date.helper";
const ProjectSection = () => {
  const navigate = useNavigate();
  const { projectID } = useParams();
  const [projectData, setProjectData] = useState();
  const [myRole, setMyRole] = useState("");
  const [isEditRequirement, setIsEditRequirement] = useState(true);
  const [isAgree, setIsAgree] = useState(false);
  const [comment, setComment] = useState();
  const [isAddEditMsg, setIsAddEditMsg] = useState(false);
  const [form] = Form.useForm();
  let initialValue;
  useEffect(() => {
    const init = async () => {
      const { success, payload } = await showProjectDetails(projectID);
      if (success) {
        setProjectData(payload.projectDetails);
        setMyRole(payload.myRole);
        if (
          payload.projectDetails.status === "negotiation" ||
          payload.projectDetails.status === "approve"
        ) {
          setIsEditRequirement(false);
        }
        initialValue = {
          expectation: payload.projectDetails.expectation,
          requirement: payload.projectDetails.requirement,
          budget: payload.projectDetails.budget,
          scope: payload.projectDetails.scope,
          dueDate: [
            parseFormattedDate(payload.projectDetails.startDate),
            parseFormattedDate(payload.projectDetails.endDate),
          ],
        };
      }
      form.setFieldsValue(initialValue);
      console.log(" payload is ", payload.projectDetails);
    };
    init();
  }, []);

  const handleShowContent = () => {
    const isShowContent =
      projectData?.status === "pending" &&
      (myRole === "admin" || myRole === "freelancer");
    if (isShowContent) {
      return false;
    } else {
      return true;
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
      date: getCurrentDate(),
      isEdit: isAddEditMsg,
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
  const handleAddDiscussion = async () => {
    const data = {
      comment,
      status: "needDiscussion",
      date: getCurrentDate(),
    };
    const { success } = await updateNegotiationComment(data, projectID);
    if (success) {
      notification({
        type: "success",
        message: "Add the comment success",
      });
      const { payload } = await showProjectDetails(projectID);
      setProjectData(payload.projectDetails);
      setComment("");
    } else {
      notification({
        type: "error",
        message: "Add the comment fail, please contract admin!",
      });
    }
  };
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
  const handleSetAgree = (isOk) => {
    if (myRole === "freelancer") {
      setIsAgree(isOk);
    } else if (myRole === "seeker" && isOk) {
      setIsEditRequirement(true);
      setIsAgree(true);
      setIsAddEditMsg(true);
    } else if (myRole === "seeker" && !isOk) {
      setIsAgree(false);
      setIsEditRequirement(false);
      setIsAddEditMsg(false);
    }
  };
  const handleFreelancerApproveRequirement = async () => {
    const { success } = await freelancerApproveRequirement(projectID);
    if (success) {
      notification({
        type: "success",
        message: "Approve the project requirement success",
      });
      const { payload } = await showProjectDetails(projectID);
      setProjectData(payload.projectDetails);
    } else {
      notification({
        type: "error",
        message:
          "Can not approve the project requirement, please contract admin!",
      });
    }
  };

  const onSubmit = () => {
    if (myRole === "seeker") {
      handleSubmitRequirementForm();
    } else {
      handleFreelancerApproveRequirement();
    }
  };
  return (
    <div className="project-section">
      <ContentLayout
        isDisable={!isEditRequirement && myRole === "seeker" ? true : false}
        isSubmit={handleShowContent() && isAgree}
        onSubmit={() => onSubmit()}
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
        {projectData?.status !== "pending" && (
          <DiscussionSection
            data={projectData?.negotiation}
            status={projectData?.status}
            myRole={myRole}
            comment={comment}
            isDiscussion={!isAgree}
            onSetAgree={handleSetAgree}
            onChange={handleChangeComment}
            onAdd={handleAddDiscussion}
          />
        )}
        {projectData?.status === "approve" &&
          !projectData?.isPaid &&
          myRole === "seeker" && (
            <Flex justify="center">
              <Button className="normal-btn">Pay</Button>
            </Flex>
          )}
      </ContentLayout>
    </div>
  );
};

export default ProjectSection;
