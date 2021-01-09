import { useState, useEffect } from "react";

// actions
import {
  getAllBlog,
  deleteBlog,
  createBlog,
} from "../../../redux/actions/blog";

// bootstrap
import { Button, Row, Col, Table } from "reactstrap";

// components
import Layout from "../../../components/Layout";
import Admin from "../../../components/Private/admin";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Paginate from "../../../components/Paginate";

// constants
import { blogContstants } from "../../../redux/actions/constant";

// next
import Link from "next/link";
import { useRouter } from "next/router";

// redux
import { useDispatch, useSelector } from "react-redux";

function blog() {
  const dispatch = useDispatch();
  const router = useRouter();
  const keyword = "";

  // blog store
  const blogStore = useSelector((state) => state.blog);
  const {
    blogs,
    loading,
    error,
    createSuccess,
    createdBlog,
    page,
    pages,
  } = blogStore;

  // useEffect

  useEffect(() => {
    dispatch({
      type: blogContstants.RESET_BLOG_SUCCESS,
    });

    if (createSuccess) {
      router.push(`/admin/blog/${createdBlog.slug}/edit`);
    } else {
      dispatch(getAllBlog());
    }
  }, [router, createSuccess, dispatch]);

  // functions
  const deleteBlogHandle = (data) => {
    if (confirm("Are you sure you want to delete this?")) {
      dispatch(deleteBlog(data));
    }
  };

  const createBlogHandle = () => {
    if (confirm("Are you sure you want to create new blog?")) {
      dispatch(createBlog());
    }
  };

  return (
    <Layout>
      <Admin>
        <Row className="align-items-center">
          <Col>
            <Link href="/admin/blog/all">
              <a>
                <h1>Blogs</h1>
              </a>
            </Link>
          </Col>
          <Col className="text-right">
            <Button color="primary" onClick={createBlogHandle}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
        </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message color="danger">{error}</Message>
        ) : (
          <>
            <Table striped bordered responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>SLUG</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {blogs?.map((x) => (
                  <tr key={x._id}>
                    <td>{x._id}</td>
                    <td>{x.mtitle}</td>
                    <td>{x.slug}</td>
                    <td>
                      {x.status ? (
                        <i
                          class="fas fa-check-circle"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          class="fas fa-times-circle"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Link href={`/admin/blog/${x.slug}/edit`}>
                        <Button color="primary" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>
                      <Button
                        color="danger"
                        className="btn-sm"
                        onClick={() => deleteBlogHandle(x.slug)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                      <Link href={`/admin/blog/${x.slug}`}>
                        <Button color="success" className="btn-sm">
                          <i class="far fa-eye"></i>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </Admin>
    </Layout>
  );
}

export default blog;
