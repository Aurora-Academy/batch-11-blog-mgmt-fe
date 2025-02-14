import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

import { getById, updateBySlug } from "../../../slices/blogSlice";
import { BASE_URL } from "../../../constants";

import ToastBox from "../../../components/Toast";

const BlogEdit = () => {
  const { pathname = "" } = useLocation();
  const blogId = pathname.split("/")[3] ?? "";
  const dispatch = useDispatch();
  const { blog, error } = useSelector((state) => state.blogs);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [payload, setPayload] = useState({
    title: "",
    status: "",
    content: "",
    image: "",
  });
  const [msg, setMsg] = useState("");

  const handleImage = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setImages([...e.target.files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", payload?.title);
    formData.append("status", payload?.status);
    if (images.length > 0 && images[0]) {
      formData.append("image", images[0]);
    }
    formData.append("content", content);
    const d = await dispatch(
      updateBySlug({ slug: blog?.slug, payload: formData })
    );
    if (d?.payload?.msg) {
      setMsg(d?.payload?.msg);
    }
  };

  useEffect(() => {
    setPreview([]);
    if (!images) {
      return;
    }
    images &&
      images.length > 0 &&
      images.map((file) => {
        const objectUrl = URL.createObjectURL(file);
        setPreview((prev) => [...prev, objectUrl]);
      });
  }, [images]);

  useEffect(() => {
    dispatch(getById(blogId));
  }, [blogId, dispatch]);

  useEffect(() => {
    if (Object.keys(blog).length > 0) {
      const { slug, author, createdAt, updatedAt, __v, _id, ...rest } = blog;
      setPayload(rest);
      setContent(rest?.content);
      if (blog?.image) setPreview([`${BASE_URL}/resources${blog?.image}`]);
    }
  }, [blog]);

  return (
    <div className="d-flex container justify-content-center">
      {error && <ToastBox msg={error} />}
      {msg && <ToastBox msg={msg} variant="success" />}
      <div className="col-lg-6">
        <div className="text-center h3">
          Update <mark>{blog?.title}</mark>
        </div>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="text-center mb-3">
            {preview && preview.length > 0 && (
              <Image
                src={preview[0]}
                fluid
                style={{ maxHeight: "200px", maxWidth: "200px" }}
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={(e) => handleImage(e)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={payload?.title}
              placeholder="Enter Title"
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={payload?.status}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="">Select one</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            Submit
          </Button>
          <Link className="btn btn-danger" to="/admin/blogs">
            Go back
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default BlogEdit;
