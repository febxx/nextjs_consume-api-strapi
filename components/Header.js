import Link from "next/link";

export default function Header(props) {
	return (
		<nav className="bg-white border-b-4 border-indigo-100 px-4 py-2.5 rounded dark:bg-gray-900">
			<div className="container flex flex-wrap items-center justify-between mx-auto">
				<a href="/" className="flex items-center text-xl">
					Perpustakaan
				</a>
				<div className="w-full block md:w-auto" id="navbar-default">
					<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
              <Link href="/create">
							<a
								href="#"
								className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
								aria-current="page"
							>
								Tambah Data
							</a>
              </Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
