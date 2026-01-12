import { useParams } from "react-router-dom"

const ViewMore = () => {
    const { blogId } = useParams();
    console.log("ID: ", blogId);
  return (
    <div>
      
    </div>
  )
}

export default ViewMore
