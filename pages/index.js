import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import axios from "axios";

export default function post(props) {
	const [post, setPost] = useState(props.data.data);
	const [search, setSearch] = useState({ data: "" });

	const storeSearch = async (e) => {
		const result = await axios.get(
			`http://localhost:1337/api/libraries?filters\[title][$contains]=${search.data}`
		);
		const data = result.data.data;
		console.log("data", data);
		setPost(data);
	};

	const handleChange = (e) => {
		setSearch((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const getAll = async () => {
		const res = await fetch("http://localhost:1337/api/libraries");
		const data = await res.json();
		setPost(data.data);
	};

	const deletePost = async (id) => {
		await fetch("http://localhost:1337/api/libraries/" + id, {
			method: "DELETE",
		});
		getAll();
	};

	const loppPost = (post) => {
		return post.map((item, index) => {
			return (
				<div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4" key={item.id}>
					<Link href={`/post/${encodeURIComponent(item.id)}`}>
						<a className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
							<div className="p-4">
								<span className="inline-block px-2 py-1 leading-none bg-blue-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
									{item.attributes.year}
								</span>
								<h2 className="mt-2 mb-2  font-bold">{item.attributes.title}</h2>
								<p className="text-sm">
									{item.attributes.publisher}: {item.attributes.place}
								</p>
							</div>
							<div className="p-4 flex items-center text-sm text-gray-600">
								<Link href={`/edit/${encodeURIComponent(item.id)}`}>
									<button className="px-2 py-1 bg-blue-500 rounded-sm text-white outline-none focus:ring-4 shadow-lg text-sm mr-1">
										Edit
									</button>
								</Link>
                <button
									onClick={(e) => deletePost(item.id)}
									className="px-2 py-1 bg-red-500 rounded-sm text-white outline-none focus:ring-4 shadow-lg text-sm mr-1"
								>
									Hapus
								</button>
							</div>
						</a>
					</Link>
				</div>
			);
		});
	};

	return (
		<div>
			<Header title="List Post"></Header>
			<div className="container mx-auto px-4 py-4 max-w-screen">
				<form>
					<label
						for="default-search"
						className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
					>
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg
								aria-hidden="true"
								className="w-5 h-5 text-gray-500 dark:text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
						</div>
						<input
							type="search"
							name="data"
							className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Seach data"
							value={search.data}
							onChange={handleChange}
							required
						/>
						<a
							onClick={storeSearch}
							className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Search
						</a>
					</div>
				</form>
			</div>
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap -mx-4">
					{loppPost(post)}
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const res = await fetch("http://localhost:1337/api/libraries");
	const data = await res.json();

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: { data },
	};
}
