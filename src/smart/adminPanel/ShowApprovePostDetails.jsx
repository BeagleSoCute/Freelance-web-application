import { useContext, useEffect, useState } from "react";
import ShowPostContentSection from "components/postService/ShowPostContentSection";
import ContentLayout from "layouts/ContentLayout";
import ApprovePostForm from "./components/ApprovePostForm";
import { useNavigate, useParams } from "react-router-dom";
import { showPostDetails, updatePostStatus } from "services/admin.service";
import { Form, Input, Radio } from "antd";
import { notification } from "helpers/notification.helper";

const ShowApprovePostDetails = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { postID } = useParams();
  const [postData, setPostData] = useState();
  const [type, setType] = useState("approve");

  useEffect(() => {
    const init = async () => {
      const { payload } = await showPostDetails(postID);
      setPostData(payload);
      console.log("payload is---", payload);
    };
    init();
  }, []);

  const handleChangeType = (e) => {
    setType(e.target.value);
    form.resetFields()
  };

  const handleSubmit = async () => {
    const data = {
      reason: form.getFieldValue("reason"),
      status: type,
    };
    const { success } = await updatePostStatus(data,postID);
    if (success) {
      notification({ type: "success", message: `${type} a post Success` });
      navigate("/admin-panel");
    } else {
      notification({
        type: "error",
        message: "Can not approve or reject a post, please contract admin!",
      });
    }
  };

  return (
    <div className="show-post-details">
      <ContentLayout
        isSubmit={true}
        onSubmit={() => handleSubmit()}
        onCancel={() => {
          navigate("/admin-panel");
        }}
      >
        <ShowPostContentSection data={postData} />
        <ApprovePostForm type={type} onChangeType={handleChangeType} form={form}  />
      </ContentLayout>
    </div>
  );
};
export default ShowApprovePostDetails;
