import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import NewDatabase from "../../appwrite/Database";

function ChaptersForm({ Chapter }) {
  const {StoryId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Order, setOrder] = useState(Chapter?.Order || 1);
  const [img, setImg] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState(Chapter?.Heading || "");
  const [status, setStatus] = useState(Chapter?.status || "Draft");
  const editorRef = useRef(null);

  const initializeEditor = () => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List,
          Quote: Quote,
        },
        data: Chapter?.content || { blocks: [] },
        placeholder: "Write your story...",
      });

      editorRef.current = editor;
    }
    return () => {
      if (editorRef.current) {
        editorRef.current.isReady.then(() => {
          editorRef.current.destroy();
          editorRef.current = null;
        });
      }
    };
  };

  useEffect(() => {
    setTimeout(initializeEditor, 100);
  }, [Chapter?.content]);

  const imageUrlHandler = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
  };

  const handleSave = async () => {
    const editor = editorRef.current;
    if (editor) {
      editor
        .save()
        .then(async (data) => {
          let i = new Number(Order);
          setOrder(i)
          let content = JSON.stringify(data)
          content = `"${content}"`
          console.log(content)
          if (Chapter) {
            const file = img ? await NewDatabase.uploadFile(img) : null;
            if (file.error) {
              console.log(
                file.error,
                "File Error this error is from ChapterForm::handleSave at line 56 When uploading image"
              );
              return;
            }
            if (file) {
              const response = await NewDatabase.updateChapter(Chapter.$id, {
                Heading: title,
                Content: content,
                status,
                Img: file.$id,
                Order : Order
              });
              if (response.error) {
                console.log(
                  response.error,
                  "File Error this error is from ChapterForm::handleSave at line 63 When updating chapter"
                );
                NewDatabase.deleteFile(file.$id);
                return;
              }
              navigate(`/story/${response.story.$id}/chapter/${response.$id}`);
            } else {
              const response = await NewDatabase.updateChapter(Chapter.$id, {
                Heading: title,
                Content: data,
                status,
                Order : Order,
              });
              if (response.error) {
                console.log(
                  response.error,
                  "File Error this error is from ChapterForm::handleSave at line 74 When updating chapter"
                );
                return;
              }
              navigate(`/story/${response.story.$id}/chapter/${response.$id}`);
            }
          } else {
            const file = img ? await NewDatabase.uploadFile(img) : null;
            if (file.error) {
              console.log(
                file.error,
                "File Error this error is from ChapterForm::handleSave at line 87 When uploading image"
              );
              return;
            }
            if (file) {
              console.log(Order)
              const response = await NewDatabase.createChapter({
                Heading: title,
                Content: content,
                status,
                Img: file.$id,
                Order : Order,
                story : StoryId
              });
              if (response.error) {
                console.log(
                  response.error,
                  "File Error this error is from ChapterForm::handleSave at line 94 When creating chapter"
                );
                NewDatabase.deleteFile(file.$id);
                return;
              }
              console.log(response)
              response.$id &&
                navigate(`/story/${response.story.$id}/chapter/${response.$id}`);
            }
          }
        })
        .catch((error) => {
          console.error("Saving failed:", error);
        });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="status" className="text-gray-600 font-semibold">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Draft</option>
            <option>Published</option>
          </select>
          <label htmlFor="Order" className="text-gray-600 font-semibold">
            Order:
          </label>
          <input
            type="number"
            min={1}
            max={20}
            id="Order"
            value={Order}
            onChange={(e) => setOrder(e.target.value)}
            className="text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></input>
        </div>

        <div className="space-x-4">
          <button
            onClick={handleSave}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Save
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Publish
          </button>
        </div>
      </div>

      <div className="w-full mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Chapter Title Here"
          className="w-full text-5xl font-semibold bg-transparent focus:outline-none text-gray-800"
        />
      </div>

      <div className="w-full mb-8 relative">
        <div
          className="w-full h-64 bg-gray-200 rounded-lg flex flex-col items-center justify-center"
          style={
            Chapter?.Img
              ? {
                  backgroundImage: `url(${NewDatabase.getFilePreview(
                    Chapter.Img
                  )})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
              : imageUrl && {
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
          }
        >
          <input
            type="file"
            onChange={imageUrlHandler}
            className={`text-gray-500 cursor-pointer ${
              Chapter?.Img || imageUrl ? "opacity-0" : "opacity-100"
            } `}
            accept="image/png, image/jpeg"
          />
        </div>
      </div>

      <hr />
      <div className="w-full mb-10">
        <div
          id="editorjs"
          className="w-full h-96  text-gray-700 p-4   rounded-lg overflow-y-auto break-words"
          style={{ minHeight: "200px" }}
        ></div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ChaptersForm;
