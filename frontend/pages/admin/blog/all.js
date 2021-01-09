import { useEffect } from "react";

// actions
import { getAllBlog } from "../../../redux/actions/blog";

// boostrap
import { ListGroup } from "reactstrap";

// components
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loader";
import Message from "../../../components/Message";
import Blog from "../../../components/Blog";
import Paginate from "../../../components/Paginate";

// env
import { DOMAIN, APP_NAME, FB_APP_ID } from "../../../config";

// next
import Head from "next/head";
import { withRouter } from "next/router";

// redux
import { compose } from "redux";
import { connect } from "react-redux";

function BlogAll(props) {
  // destruct props
  const { getAllBlog, blog, router } = props;
  // destruct blog
  const { loading, blogs, error, page, pages } = blog;
  // get keyword params
  const { keyword } = router.query;
  // get pageNumber params
  const { pageNumber } = router.query || 1;

  useEffect(() => {
    getAllBlog(keyword, pageNumber);
  }, [getAllBlog, keyword, pageNumber]);

  return (
    <>
      <Head>
        <title>Blogs | {APP_NAME}</title>
        <meta name="description" content="Blogs and tutorials" />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta
          property="og:title"
          content={`Latest blogs and tutorials | ${APP_NAME}`}
        />
        <meta propery="og:description" content="Blogs and tutorials" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content="/image/blog.jpg" />
        <meta property="og:image:secure_url" content="/images/blog.jpg" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
      <Layout>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message color="danger">{error}</Message>
        ) : (
          <>
            <ListGroup className="list-group-flush">
              {blogs.map((x) => x.status && <Blog blog={x} />)}
            </ListGroup>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => ({
  blog: state.blog,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBlog: (keyword, pageNumber) =>
      dispatch(getAllBlog(keyword, pageNumber)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(BlogAll);
