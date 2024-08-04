import React from 'react'

function Home() {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">

        {/* Hero Section: Background image with headline and search bar */}
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/7f54cc76-1094-4c27-96f8-6fda6f8ab7e6.png")',
              }}
            >
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] text-center">
                Write together, share together.
              </h1>
              <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div className="text-[#637588] flex border border-[#dce0e5] bg-white items-center justify-center pl-[15px] rounded-l-xl border-r-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Start a story"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-full placeholder:text-[#637588] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                    value=""
                  />
                  <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#dce0e5] bg-white pr-[7px]">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                      <span className="truncate">Get Started</span>
                    </button>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Featured Categories Section: Displaying categories with images and descriptions */}
        <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch p-4 gap-8">
            {/* Category 1 */}
            <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-52 pt-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                style={{
                  backgroundImage: 'url("https://cdn.usegalileo.ai/stability/a348cd7f-4dc9-4f4b-8d07-7ed524e3cac3.png")',
                }}
              ></div>
              <div>
                <p className="text-[#111418] text-base font-medium leading-normal">Fantasy</p>
                <p className="text-[#637588] text-sm font-normal leading-normal">Explore our latest fantasy stories</p>
              </div>
            </div>

            {/* Category 2 */}
            <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-52 pt-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                style={{
                  backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/f8313a77-ff81-4d49-838d-81904cc0353f.png")',
                }}
              ></div>
              <div>
                <p className="text-[#111418] text-base font-medium leading-normal">Sci-fi</p>
                <p className="text-[#637588] text-sm font-normal leading-normal">Embark on a sci-fi space adventure</p>
              </div>
            </div>

            {/* Category 3 */}
            <div className="flex h-full flex-1 flex-col gap-4 text-center rounded-lg min-w-52 pt-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex flex-col self-center w-full"
                style={{
                  backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/9fb810cd-6d2f-45e8-8320-b551f4c16ba6.png")',
                }}
              ></div>
              <div>
                <p className="text-[#111418] text-base font-medium leading-normal">Romance</p>
                <p className="text-[#637588] text-sm font-normal leading-normal">Get lost in a romantic tale</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home