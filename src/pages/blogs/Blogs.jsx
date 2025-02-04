import { useQuery } from "@tanstack/react-query";
import instance from "../../utils/axios";
import { URLS } from "../../constants";

const Blogs = () => {
  const getBlogs = async () => {
    return await instance.get(URLS.GET_PUBLISHED_BLOGS);
  };

  const { data, isPending } = useQuery({
    queryKey: ["published-blogs"],
    queryFn: getBlogs,
  });

  return <div>{isPending ? <>Loading...</> : JSON.stringify(data.data)}</div>;
};

export default Blogs;
