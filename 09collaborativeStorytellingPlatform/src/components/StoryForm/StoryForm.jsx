import React , { useState } from 'react';
import NewDatabase from "../../appwrite/Database"; 
import { useForm, useFieldArray } from 'react-hook-form';
import { Input, RTE, Button, Select } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { addStory, updateStory } from '../../store/storySlice';
import { useNavigate } from 'react-router-dom';

function StoryForm({ Story }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img , setImg] = useState()
  const userProfileState = useSelector((state) => state.userProfile);
  const  userProfile  = userProfileState.userProfile;
  const { userData } = useSelector((state) => state.auth);
  const { register, handleSubmit, control, getValues, formState: { errors } } = useForm({
    defaultValues: {
      Title: Story?.Title || "",
      Description: Story?.Description || "",
      Mature: Story?.Mature || false,
      Complete: Story?.Complete || false,
      Img: Story?.Img || null,
      MainCharacters: Story?.MainCharacters.map(({Character}) => ({value: Character})) || [{value: ""}],
      Category: Story?.Category || "Action",
      status: Story?.status || "inactive"

    }
  });
  const {fields , append , remove} = useFieldArray({ control, name: "MainCharacters"})

  const onSubmit  = async (data) => {
    data.MainCharacters = data.MainCharacters.map((obj) => obj.value )
      if(Story){
        const file = data.Img[0]? await NewDatabase.uploadFile(data.Img[0]) : null
        if(file.error) {
          console.log(file.error)
          return
        }
        if(file) {
          await NewDatabase.deleteFile(Story.Img).then((response) => {
            if(response.error){
              console.log(response.error)
              return
            }
            if(response){
              data.Img = file.$id
              dispatch(updateStory({Id: Story.$id, data})).then((response) => {
                if(response && response.error){
                  console.log(response.error)
                  NewDatabase.deleteFile(file.$id)
                  return
                }
                if (response){
                  console.log(response)
                  navigate(`/story/${response.payload.$id}`)
                }
              })
            }
          })
        }else{
          dispatch(updateStory({Id: Story.$id, data})).then((response) => {
            if(response && response.error){
              console.log(response.error)
              return
            }
            if (response){
              console.log(response)
              navigate(`/story/${response.payload.$id}`)
            }
          })
        }

      }else {
        const file = data.Img[0]? await NewDatabase.uploadFile(data.Img[0]) : null
        if(file && file.error){
          console.log(file.error)
          return
        }
        if(file){
          data.Img = file.$id
          data.userProfile = userProfile.$id
          console.log(data)
          dispatch(addStory({data})).then((response) => {
            if(response && response.error){
              NewDatabase.deleteFile(file.$id)
              console.log(response.error)
              return
            }
            if (response){
              console.log(response)
              navigate(`/story/${response.payload.$id}`)
            }
          })
        }
      }

  };


  const handleImg = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <div className="container mx-auto p-5">
      <div className="header text-center mb-10">
        <h1 className="text-2xl font-bold">Write a New Story</h1>
      </div>
      <div className="form-container bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Input
              type="text"
              name="Title"
              label="Story Title"
              {...register('Title', { required: true })}
              placeholder="Enter the title of your story"
            />
            {errors.Title && <p className="text-red-500"> Title is required</p>}
          </div>
          <div className="mb-6">
            <Input
              name="Description"
              label="Story Description"
              type="text"
              {...register('Description', { required: true })}
              placeholder="Describe what your story is about..."
            />
            {errors.Description && <p className="text-red-500">Description is required</p>}
          </div>
          <div className="mb-6 flex flex-col space-y-4">
            {fields.map((field, index) => (
            <div className='flex items-center' key={field.id}>
              <Input
              name={`MainCharacters[${index}].value`}
              placeholder="Enter the name of the main character"
              label={`Main Character ${index + 1}`}
              type="text"
              className=""
              {...register(`MainCharacters.${index}.value`, {required: true})}
            />
            <Button className='' onClick={() => remove(index)}> Remove </Button>
            </div>
            ))}
            {errors.MainCharacters && <p className="text-red-500">Can not Submit Empty Character</p>}
          </div>
            <Button
            onClick={() => append({value: ""})}
            className='mt-4'
            >
              Add Character
            </Button>
         {/*  <div className="mb-6">
            <RTE
              Name="Content"
              control={control}
              label="Story Content :"
              defaultValue={Story ? Story.Content : getValues("Content")}
            />
            {errors.Content && <p className="text-red-500">Can not Submit Empty Story</p>}
          </div> */}
          <div className="mb-6">
            <label className="block mb-2" htmlFor="storyPhoto">Upload Photo</label>
            <label htmlFor="storyPhoto" className="file-label block cursor-pointer bg-gray-200 border border-gray-300 rounded-md py-2 px-4">
              <Input
                type="file"
                name="Img"
                className=""
                {...register('Img', {required: Story ? false : true})}
                onChange={handleImg}
              />
            </label>
            <div className='w-full h-full items-center justify-center'>
              <img src={img} className='w-full h-full'/>
            </div>
            {errors.Img && <p className="text-red-500">Image is required</p>}
          </div>
          <div className='mb-6'>
          <Select 
          name="Category"
          label="Story Category"
          {...register('Category', { required: true })}
          options={["Action", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller" ]}
          
          />
          </div>
          <div className="mb-6">
           <Select
           name = "status"
           label="Story Status"
           defaultValue={Story?.Status || "select status"}
           {...register('status', { required: true })}
           options={["active", "inactive", "Draft"]}
           />
            {errors.status && <p className="text-red-500">Status of The story is required</p>}
          </div>
          <div className='mb-6'>
            <Input 
            type="checkbox"
            label="Mature:"
            widthHeight="w-4 h-4"
            className=" mx-2"
            {...register('Mature')}

            />
          </div>
          <div className='mb-6'>
            <Input 
            type="checkbox"
            label="is Your Story Complete:"
            widthHeight="w-4 h-4"
            className=" mx-2"
            {...register('Complete')}

            />
          </div>
          <div className="flex justify-between items-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StoryForm;
