import { useParams } from 'react-router-dom'

function EditedChapters() {
  const {editedChapterId} = useParams();
  console.log(editedChapterId)
  return (
    <div>EditedChapters</div>
  )
}

export default EditedChapters
