// app/post/[id]/page.jsx

import Navbar from '../../../common/Navbar'
import Footer from '../../../common/Footer'

export async function generateMetadata({ params }) {
  const API = process.env.NEXT_PUBLIC_API;

  const res = await fetch(`${API}/getpost/${params.id}`);
  const result = await res.json();

  return {
    title: result.data.title,
    description: result.data.description,
  };
}

async function getPost(id) {
  const API = process.env.NEXT_PUBLIC_API;

  const res = await fetch(`${API}/getpost/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const result = await res.json();
  return result.data;
}

const PostPage = async ({ params }) => {
  const post = await getPost(params.id);
  const API = process.env.NEXT_PUBLIC_API;

  return (
    <div>
      <Navbar />

      <div className="p-5">
        <h1 className="text-3xl font-bold mt-4 p-3">
          {post.title}
        </h1>

        <p className="mt-4 text-2xl p-3">
          By: {post.posted_by}
        </p>

        {post.image && (
          <img
            src={`${API}/files/${post.image}`}
            className="object-cover rounded w-full h-full"
            alt={post.title}
          />
        )}

        <p className="mt-2 text-gray-600 text-2xl">
          {post.description}
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default PostPage;