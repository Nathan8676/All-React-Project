import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input'; 
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUserProfile } from '../store/userProfileSlice';
import NewDatabase from '../appwrite/Database';
const CreateProfile = () => {
  const auth = useSelector(state => state.auth)
  const [avatar , setAvatar] = useState()
  const [error , setError] = useState()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (step === 4) {
      console.log(data, "form data");
      setAvatar(URL.createObjectURL(data.Avatar[0]))
      if(auth.status){
        let UserId = auth.userData.$id
      console.log('Form data:', data);
      const file = data.Avatar[0]? await NewDatabase.uploadFile(data.Avatar[0]) : null
      if(file.error) {
        setError("This is File Error"+file.error)
        return
      }
      if(file) {
        data.Avatar = file.$id
        dispatch(addUserProfile({UserId,data})).then((response) => {
          if(response.error){
            console.log(response.error)
            return
          }
          if(response){
           window.location.reload() 
            navigate('/profile')
          }
        })
      }
    }
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleAvatar = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]))
  }


  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg dark:bg-zinc-950 dark:text-white dark:border-black bg-gray-100 rounded-xl p-10 border border-black/10">
        
        {/* Title */}
        <div className="mb-2 flex justify-center">
          <span className="mb-2 flex justify-center">Logo</span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Create Your Profile
        </h2>

        {/* Progress Bar */}
        <div className="my-4">
          <p className="text-center text-base dark:text-white text-black/60">
            Step {step} of 4
          </p>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div className="h-2 bg-blue-500 rounded" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        </div>

        {/* Error Message */}
        {errors && Object.keys(errors).length > 0 && (
          <p className="text-red-600 mt-8 text-center">Please fill all required fields correctly.</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {step === 1 && (
              <Input
                label="Username Handle"
                placeholder="Enter your username"
                {...register("UserName", { required: true })}
              />
            )}
            
            {step === 2 && (
              <Input
                label="Date of Birth"
                type="date"
                placeholder="Select your date of birth"
                {...register("Dob", { required: true })}
              />
            )}
            
            {step === 3 && (
              <Input
                label="Bio"
                placeholder="Tell us about yourself"
                {...register("bio")}
              />
            )}
            
            {step === 4 && (
              <>
              <Input
                label="Avatar / Profile Picture"
                type="file"
                accept="image/*"
                {...register("Avatar")}
                onChange={handleAvatar}
              />
              {avatar && 
              <div className='w-full h-full flex items-center justify-center overflow-hidden rounded-full'>
                <img src={avatar} className='w-40 h-40 rounded-full items-center'  />
              </div>}
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-200"
                  textColor="text-gray-700"
                  children="Back"
                />
              )}

              <Button
                type="submit"
                className="w-full"
                bgColor="bg-red-500"
                textColor="text-white"
                children={step === 4 ? "Finish" : "Next"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
