import { useRouter } from 'next/router'
import { useState } from "react";
import axios from "axios";

export default function FormPost(props) {
    const router = useRouter()
    const [data, setData] = useState({
      title: props.dataPost ? props.dataPost.attributes.title : '',
      year: props.dataPost ? props.dataPost.attributes.year : '',
      publisher: props.dataPost ? props.dataPost.attributes.publisher : '',
      place: props.dataPost ? props.dataPost.attributes.place : ''
    })

    const handleChange = (e) => {
        setData(prevState => (
            {
                ...prevState, [e.target.name]: e.target.value
            }
        ))
    }
    const storeData = async (e) => {
      const result = await axios.post("http://localhost:1337/api/libraries", {
        data: data
      });
      router.push('/')

    }

    const updateData = async (e) => {
      const result = await axios.put("http://localhost:1337/api/libraries/" + props.dataPost.id, {
        data: data
      });
      router.push('/')

    }

    const handleButton = (action) => {
        if (action == 'add') {
            return <a className="rounded text-gray-100 px-3 py-1 bg-red-500 hover:shadow-inner hover:bg-red-700 transition-all duration-300" onClick={storeData}>Submit</a>
        } else if (action == 'update') {
            return <a className="rounded text-gray-100 px-3 py-1 bg-red-500 hover:shadow-inner hover:bg-red-700 transition-all duration-300" onClick={updateData}>Update</a>
        }
    }

    return (
        <div className="my-10">
            <form>
                <div class="my-8 border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                    <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                        <p>
                            <label for="name" class="bg-white text-gray-600 px-1">Judul *</label>
                        </p>
                    </div>
                    <p>
                        <input type="text" id="idTitle"
                            name="title"
                            value={data.title}
                            onChange={handleChange} class="py-1 px-1 text-gray-900 outline-none block h-full w-full" />
                    </p>
                </div>

                <div class="my-8 border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                    <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                        <p>
                            <label for="name" class="bg-white text-gray-600 px-1">Tahun Terbit *</label>
                        </p>
                    </div>
                    <p>
                        <input type="text" className="form-control"
                            name="year"
                            value={data.year}
                            onChange={handleChange} class="py-1 px-1 text-gray-900 outline-none block h-full w-full" />
                    </p>
                </div>

                <div class="my-8 border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                    <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                        <p>
                            <label for="name" class="bg-white text-gray-600 px-1">Penerbit *</label>
                        </p>
                    </div>
                    <p>
                        <input type="text" className="form-control"
                            name="publisher"
                            value={data.publisher}
                            onChange={handleChange} class="py-1 px-1 text-gray-900 outline-none block h-full w-full" />
                    </p>
                </div>

                <div class="my-8 border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                    <div class="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                        <p>
                            <label for="name" class="bg-white text-gray-600 px-1">Tempat Terbit *</label>
                        </p>
                    </div>
                    <p>
                        <input type="text" className="form-control"
                            name="place"
                            value={data.place}
                            onChange={handleChange} class="py-1 px-1 text-gray-900 outline-none block h-full w-full" />
                    </p>
                </div>
                {handleButton(props.action)}
            </form>
        </div>
    )
}

