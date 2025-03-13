import React, { useEffect } from 'react'
import { Card, StoryCard, HeroSection, StoryForm, Container } from '../components';
import { useDispatch } from 'react-redux';
import { getStories } from '../store/storySlice';
import { Query } from 'appwrite';
import HeroImg from '../assets/hero.jpg'
function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStories()).then((response) => {
      console.log(response)
    })
  })
  return (
    <Container>
      <HeroSection backgroundImage={HeroImg} heading="Collaborative Storytelling Platform" btnText={'Get Started'} InputPlaceholder={'search'} />
      <div className='flex flex-row justify-center items-center gap-4 '>
      <Card title="Fantasy" heading={true} content={true} description="This is a fantasy" photoUrl={"https://t3.ftcdn.net/jpg/02/81/42/82/360_F_281428216_YWRTOqeBWBmtuWxBci02ClnEnI22Fh7e.jpg"} />
      <Card title="Fantasy" heading={true} content={true} description="This is a fantasy" photoUrl={"https://t3.ftcdn.net/jpg/02/81/42/82/360_F_281428216_YWRTOqeBWBmtuWxBci02ClnEnI22Fh7e.jpg"} />
      <Card title="Fantasy" heading={true} content={true} description="This is a fantasy" photoUrl={"https://t3.ftcdn.net/jpg/02/81/42/82/360_F_281428216_YWRTOqeBWBmtuWxBci02ClnEnI22Fh7e.jpg"} />
      </div>
      <StoryCard heading="Stories" subheading="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam et quam voluptate. Eum esse aliquam quas in reiciendis, quisquam rem eius inventore porro aspernatur nesciunt, repellendus quae facere illum consectetur. Ipsa vero, temporibus similique sequi minus eius officiis quis odit quaerat ipsum voluptate neque asperiores maxime! Nemo ipsam officia natus doloribus alias eligendi deleniti commodi nihil, minima eveniet ratione illum reprehenderit. Labore, dolorum. Voluptas eveniet vel nihil facere accusantium maiores deleniti reprehenderit tempore dolor voluptatem explicabo, cupiditate sunt expedita distinctio debitis consequuntur. Amet, incidunt. Eos saepe, adipisci possimus voluptate doloremque ea est quae, deserunt harum reiciendis voluptas suscipit temporibus sapiente minima molestiae quibusdam! Eligendi nobis labore culpa impedit omnis recusandae beatae reiciendis vel officiis quibusdam fugiat eum quaerat aspernatur ducimus, blanditiis, tempora deserunt magnam voluptatum aut corporis temporibus. Cumque eos reprehenderit, tempore suscipit natus recusandae quam. Tempora quod enim reiciendis facilis nostrum obcaecati eos, quas distinctio vel doloribus numquam non cum laborum, itaque incidunt culpa quam accusamus modi facere in? Corporis cupiditate minus iure nobis aliquam vitae earum provident. Dolorem laudantium rerum nulla pariatur commodi. Nam illum ducimus, corrupti nobis ullam id itaque iusto, excepturi repudiandae eaque quibusdam possimus, autem debitis ipsum porro sint voluptatibus non exercitationem totam? Possimus, illo." imageSrc={"https://www.imgacademy.com/sites/default/files/styles/scale_1700w/public/2022-07/img-homepage-meta_0.jpg?itok=LMirU0Ik"} />
    </Container>
  );
}

export default Home