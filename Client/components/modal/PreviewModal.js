import { Modal } from "antd";
import ReactPlayer from "react-player";

const PreviewModal = ({preview, setShowModal, showModal})=>{

    return (
        <>
        <Modal title='Course preview' open={showModal} destroyOnClose={true} onCancel={() => setShowModal(!showModal)} width={720} footer={null}>
            <div className="wrappr">
                <ReactPlayer url={preview} playing={showModal}  controls={true} width='100%' height='100%'/>
            </div>
        </Modal>
        </>
    )
}

export default PreviewModal;