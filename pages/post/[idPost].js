import Header from "../../components/Header";

export default function ShowPost(props) {
  const data = props.data.data;
  return (
      <div>
          <Header title="Books"></Header>
          <div className="container mx-auto px-4 py-4 max-w-screen">
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.attributes.title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Tahun: {data.attributes.year}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Penerbit: {data.attributes.publisher}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Tempat Terbit: {data.attributes.place}</p>
            </div>
          </div>
      </div>
  )
}

export async function getServerSideProps(context) {
    // const router = useRouter();
    const { idPost } = context.query
    if (idPost) {
        const res = await fetch('http://localhost:1337/api/libraries/' + idPost)
        const data = await res.json()

        if (!data) {
            return {
                notFound: true,
            }
        }

        return {
            props: { data }, // will be passed to the page component as props
        }
    }

}