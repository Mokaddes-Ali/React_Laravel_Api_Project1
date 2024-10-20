import { useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl, token } from '../../http';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';


const Create = ({ placeholder }) => { 
  const editor = useRef(null);
  const [content, setContent] = useState('');


  const config = useMemo(() => ({
    readonly: false, 
    placeholder: placeholder || 'Content', 
  }), [placeholder]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newData = { ...data, content,};

    try {
      const res = await fetch(apiUrl + 'clients/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(newData),
      });

      const result = await res.json();

      if (result.status === true) {
        toast.success(result.message);
        navigate('/show');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form.');
      console.error(error); // Log the error for debugging
    }
  };





  return (
    <>
    <div className="">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add New Service
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
             Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('name', { required: 'Service Name is required' })}
                placeholder='Service Name'
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.name ? 'ring-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.name && (
                <span className="text-sm text-red-600">{errors.name.message}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Please enter a valid email address',
                  },
                })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.email ? 'ring-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Content
            </label>
            <div className="mt-2">
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} 
                onBlur={newContent => setContent(newContent)} 
                onChange={newContent => {}} 
              />
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Service Image</label>
            <br />
            <input  type="file" className="" />

          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Status</label>
            <div className="mt-2">
              <select
                {...register('status', { required: 'Status is required' })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
              {errors.status && (
                <span className="text-sm text-red-600">{errors.status.message}</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button type = "submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

    </>
  );
};

export default Create
