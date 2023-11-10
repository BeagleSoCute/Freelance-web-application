import { useContext, useEffect, useState } from "react";
import ShowPostContentSection from "components/postService/ShowPostContentSection";
import ContentLayout from "layouts/ContentLayout";
import { useNavigate, useParams } from "react-router-dom";
import { showPostDetails, sendServiceRequest } from "services/service.service";
import RequestForm from "./components/RequestForm";
import { Form } from "antd";
import { notification } from "helpers/notification.helper";

const ShowPostDetails = ({}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { postID, type } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const init = async () => {
      const result = await showPostDetails(postID, type);
      setData(result.payload);
    };
    init();
  }, []);
  const handleSubmit = async () => {
    const data = {
      description: form.getFieldValue("description"),
    };
    const { success } = await sendServiceRequest(data, postID, type);
    if (success) {
      notification({ type: "success", message: `Send a request Success` });
      navigate("/service-list");
    } else {
      notification({
        type: "error",
        message: "Can not send a request, please contract admin!",
      });
    }
  };
  return (
    <div className="show-post-details">
      <ContentLayout
        isSubmit={true}
        onSubmit={handleSubmit}
        onCancel={() => navigate()}
      >
        <ShowPostContentSection postType={type} data={data} />
        <RequestForm form={form} />
      </ContentLayout>
    </div>
  );
};

export default ShowPostDetails;
