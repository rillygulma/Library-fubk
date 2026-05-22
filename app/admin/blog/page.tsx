"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

type BlogPost = {
  _id: string;
  title: string;
  description: string;
  content: string;
  images: string[];
  createdAt?: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  // FORM STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string>("");

  const [editId, setEditId] = useState<string | null>(null);

  // FETCH POSTS
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/blog");
      setPosts(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      await fetchPosts();
    };

    loadPosts();
  }, []);

  // CREATE OR UPDATE
  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        description,
        content,
        images: images.split(",").map((img) => img.trim()),
      };

      if (editId) {
        await axios.put(`/api/blog/${editId}`, payload);
      } else {
        await axios.post("/api/blog", payload);
      }

      setTitle("");
      setDescription("");
      setContent("");
      setImages("");
      setEditId(null);

      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;

    try {
      await axios.delete(`/api/blog/${id}`);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  // EDIT
  const handleEdit = (post: BlogPost) => {
    setEditId(post._id);
    setTitle(post.title);
    setDescription(post.description);
    setContent(post.content);
    setImages(post.images.join(", "));
  };

  return (
    <div className="p-6 space-y-10">
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-blue-700">
        📝 Blog Admin Panel
      </h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Images (comma separated URLs)"
          value={images}
          onChange={(e) => setImages(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Post" : "Create Post"}
        </button>
      </div>

      {/* POSTS */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded shadow space-y-2"
            >
              {/* IMAGE */}
              {post.images?.[0] && (
                <div className="relative h-40 w-full">
                  <Image
                    src={post.images[0]}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}

              <h2 className="text-lg font-bold">{post.title}</h2>
              <p className="text-gray-600 text-sm">
                {post.description}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}