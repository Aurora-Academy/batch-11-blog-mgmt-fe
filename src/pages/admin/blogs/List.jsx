import { useEffect } from "react";
import { Link } from "react-router";
import { Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BiTrash } from "react-icons/bi";

import {
  listBlogs,
  createBlog,
  getById,
  removeBySlug,
  setCurrentPage,
  setLimit,
} from "../../../slices/blogSlice";

import AlertBox from "../../../components/AlertBox";
import { TableLoading } from "../../../components/SkeletalLoading";
import Paginate from "../../../components/Paginate";

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, currentPage, limit, loading, total } = useSelector(
    (state) => state.blogs
  );

  const handleStatusChange = (blog) => {
    console.log(blog);
  };

  const handleCurrentPage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const handleLimit = (num) => {
    dispatch(setLimit(num));
  };

  useEffect(() => {
    dispatch(listBlogs({ page: currentPage, limit }));
  }, [currentPage, limit, dispatch]);

  return (
    <div>
      {loading && <TableLoading tableHeaders={["title", "Author", "Status"]} />}
      {!loading && blogs.length === 0 && <AlertBox label="Data not found..." />}

      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((bm, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                <Link
                  to={`/admin/blogs/${bm?._id}`}
                  className="link-offset-2 link-underline link-underline-opacity-0"
                >
                  {bm?.title}
                </Link>
              </td>
              <td>{bm?.author?.name}</td>
              <td>
                <Form.Check
                  type="switch"
                  checked={bm?.status === "published"}
                  onChange={() => handleStatusChange(bm)}
                />
              </td>
              <td>
                <BiTrash
                  color="red"
                  // onClick={() => dispatch(removeBySlug(bm?.slug))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Paginate
          //blogs, currentPage, limit
          currentPage={currentPage}
          limit={limit}
          total={total}
          setPage={handleCurrentPage}
          setLimit={handleLimit}
        />
      </div>
    </div>
  );
};

export default BlogList;
