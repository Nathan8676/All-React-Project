import {useState , useEffect} from 'react';
import { Button, Input } from '../components';
const HeroSection = ({heading , btnText, InputPlaceholder, backgroundImage }) => {
  const [query , setQuery] = useState([])
  return (
    <div className="container">
      <div className="p-4">
        <div
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${backgroundImage})`,
          }}
        >
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] text-center">
            {heading}
          </h1>
          {/* Space reserved for input field and button */}
          <div className="flex w-full max-w-[480px] items-center">
            <div className="flex flex-1 gap-2 rounded-xl bg-white border border-[#dce0e5]">
              {/* Input field */}
              <Input
              type="text"
              className="border-none"
              placeholder={InputPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="ml-2 ">
              {/* Button */}
              <Button>
                {btnText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
