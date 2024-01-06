import React from 'react'
import { useState, useEffect } from 'react';
import { Loader, FormField, Cards } from './components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Cards {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setloading] = useState(false);
  const [AllPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(()=>{
    const fetchPosts = async () =>{
      setloading(true);
      try {
        const response = await fetch('https://dall-e-based-image-generation-plateform.onrender.com/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response.ok){
          const Results = await response.json();
          setAllPosts(Results.data.reverse());
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }finally{
        setloading(false);
      }
    }

    fetchPosts();
  }, [])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(
        ()=>{
          const serachedResults_ = AllPosts.filter((item) => 
            item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase())
          );
          setSearchedResults(serachedResults_);
        }, 500
      )
    )

  }
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={AllPosts}
                  title="No Posts Yet"
                />
              )}
            </div>

          </>
        )}
      </div>
    </section>
  )
}

export {
    Home
}