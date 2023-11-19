import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "contexts/app.context";
import ContentLayout from "layouts/ContentLayout";
import RequirementForm from "./components/RequirementForm";
import {
  showProjectDetails,
  updateProjectRequirement,
  updateNegotiationComment,
  freelancerApproveRequirement,
} from "services/project.service";
import { seekerPayForService } from "services/escrow.service";
import { Form, Button, Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getFormatedDate } from "helpers/date.helper";
import { notification } from "helpers/notification.helper";
import DiscussionSection from "./components/DiscussionSection";
import { getCurrentDate } from "helpers/date.helper";
import isEmpty from 'lodash/isEmpty';

const NegotiationSection = () => {
  const { projectDetail, loading, setProjectDetail } = useContext(AppContext);
  const { projectID } = useParams();
  const navigate = useNavigate();
  const [myRole, setMyRole] = useState("");
  const [isEditRequirement, setIsEditRequirement] = useState(true);
  const [isAgree, setIsAgree] = useState(false);
  const [comment, setComment] = useState();
  const [isAddEditMsg, setIsAddEditMsg] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const init = async () => {
      if (isEmpty(projectDetail) && !loading) {
        navigate(`/landing-project-page/${projectID}`)
        return;
      }
      setMyRole(projectDetail?.myRole);
      if (
        projectDetail?.status === "negotiation" ||
        projectDetail?.status === "approve"
      ) {
        setIsEditRequirement(false);
      }
    };
    init();
  }, [loading]);

  const handleShowContent = () => {
    const isShowContent =
      projectDetail?.status === "pending" &&
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
      projectDetail?._id
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
    const { success } = await updateNegotiationComment(
      data,
      projectDetail?._id
    );
    if (success) {
      notification({
        type: "success",
        message: "Add the comment success",
      });
      const { payload } = await showProjectDetails(projectDetail?._id);
      setProjectDetail(payload?.projectDetails);
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
    const { success } = await freelancerApproveRequirement(projectDetail?._id);
    if (success) {
      notification({
        type: "success",
        message: "Approve the project requirement success",
      });
      const { payload } = await showProjectDetails(projectDetail?._id);
      setProjectDetail(payload?.projectDetails);
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
  const handlePayService = () => {
    const transformData = {
      amount: form.getFieldValue("budget"),
      date: getCurrentDate(),
    };
    const { success } = seekerPayForService(transformData, projectDetail?._id);
    if (success) {
      notification({
        type: "success",
        message: "Pay for the service success",
      });
    } else {
      notification({
        type: "error",
        message: "Pay for the service fail, please contract admin!",
      });
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
            data={projectDetail}
            form={form}
          />
        ) : (
          <h1>Please wait the seeker to finish the requirement form </h1>
        )}
        {projectDetail?.status !== "pending" && (
          <DiscussionSection
            data={projectDetail?.negotiation}
            status={projectDetail?.status}
            myRole={myRole}
            comment={comment}
            isDiscussion={!isAgree}
            onSetAgree={handleSetAgree}
            onChange={handleChangeComment}
            onAdd={handleAddDiscussion}
          />
        )}
        {projectDetail?.status === "approve" &&
          !projectDetail?.isPaid &&
          myRole === "seeker" && (
            <Flex justify="center">
              <Button onClick={() => handlePayService()} className="normal-btn">
                Pay
              </Button>
            </Flex>
          )}
      </ContentLayout>
    </div>
  );
};

export default NegotiationSection;
