import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { imglogo } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { data } from 'autoprefixer';

const CreatePost = () => {

    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        name: '',
        prompt: '',
        photo: '', 
    });

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(form.prompt && form.photo) {
            setLoading(true);

            try {
                const response = await fetch('https://expelimus.onrender.com/api/v1/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form)
                    // we pass in the entire form
                })

                await response.json();
                navigate('/');
            }
            catch (err) {
                alert(err)
            }
            finally {
                setLoading(false);
            }
        } else {
            alert('Cast your spell and watch magic happen');
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt })
    }
    
    const generateImage = async () => {
        if(form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('https://expelimus.onrender.com/api/v1/expelimus', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: form.prompt }),
                    // we are passing all of the needed data to our backend to then get back the response to out frontend
                });
                const data = await response.json();

                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
                // ,, form to spread other parameters and we set the photo to be equal to the above
            }
            catch (error) {
                alert(error);
            } 
            finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Cast a spell');
        }
    }

  return (
    <section className="max-w-7xl mx-auto">
        <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create your very own Magic</h1>
        <p className="mt-2 text-[#666E75] text-[16px] max-w-[500px]">
            Make your Magic Spell come alive with the power of DALL-E AI
        </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
            <div className="flex flex-col gap-5">
                <FormField
                    labelName="Tell the AI Wizard some Hocus Pocus"
                    type="text"
                    name="name"
                    placeholder="cast your spells here"
                    value={form.name}
                    handleChange={handleChange}
                />
                <FormField
                    labelName="Wizard Prompt"
                    type="text"
                    name="prompt"
                    placeholder="unfathomable beauty in a formless state"
                    value={form.prompt}
                    handleChange={handleChange}
                    isSurpriseMe
                    handleSurpriseMe={handleSurpriseMe}
                />

<div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
                <img 
                    src={form.photo}
                    alt={form.prompt}
                    className="w-9/12 h-9/12 object-contain"
                 />
            ) : (
                <img
                    src={imglogo}
                    alt="preview"
                    className='w-9/12 h-9/12 object-contain opacity-40' 
                />
            )}

            {generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,.5)] rounded-lg'>
                    <Loader />
                </div>
            )}
</div>
            </div>
            <div className="mt-5 flex gap-5">
                <button
                    type='button'
                    onClick={generateImage}
                    className='text-white bg-magic-color font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                >
                    {generatingImg ? 'Casting the Spell...' : 'Cast A Spell 🧪'}
                </button>
            </div>

            <div className="mt-10">
                <p className='mt-2 text-[#666E75] text-[14px]'>After you finish making your spell, share with other Wizard & Witches</p>
                <button
                    type='submit'
                    className='mt-3 text-white bg-[#4c2c1e] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                >
                    {loading ? 'Sharing magic...' : 'Share your magic'}
                </button>
            </div>
        </form>
    </section>
  )
}

export default CreatePost