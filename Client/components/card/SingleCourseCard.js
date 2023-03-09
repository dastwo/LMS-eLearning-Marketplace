import { Badge, Modal, Button } from "antd";
import { currencyFormatter } from "../../utils/helpers";
import ReactPlayer from "react-player";
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";

const SingleCourseCard = ({
  course,
  setPreview,
  setShowModal,
  showModal,
  preview,
  user,
  loading,
  handleFreeEnrollment,
  handlePaidEnrollment,
  enrolled,
}) => {
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;
  return (
    <div className="container-fluid bg-primary pt-3">
      <div className="row">
        <div className="col-md-8">
          <h1 className="text-light fw-bold">{name}</h1>
          <p className="lead">
            {description && description.substring(0, 160)}...
          </p>
          <Badge
            count={category}
            style={{ background: "#3a0f4" }}
            className="pb-2 "
          />
          <p>Created by {instructor.name}</p>
          <p>Lest updated {new Date(updatedAt).toLocaleDateString()}</p>
          <h4 className="text-light">
            {paid
              ? currencyFormatter({ amount: price, currency: "usd" })
              : "Free"}
          </h4>
        </div>
        <div className="col-md-4">
          {lessons[0].video && lessons[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(lessons[0].video.Location);
                setShowModal(!showModal);
              }}
            >
              <ReactPlayer
                className="react-player-div"
                url={lessons[0].video.Location}
                light={image.Location}
                width="100%"
                height="225px"
              />
            </div>
          ) : (
            <>
              <img
                src={image && image.Location ? image.Location : "/course.png"}
                alt={name}
                className="img img-fluid"
              />
            </>
          )}
          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingOutlined className="h1 text-danger" />
            </div>
          ) : (
            <Button
              className="mt-3"
              type="default"
              block
              shape="round"
              icon={<SafetyOutlined />}
              disabled={loading}
              onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
            >
              {user
                ? enrolled.status
                  ? "Go to course"
                  : "Enroll"
                : "Login to enroll"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseCard;
