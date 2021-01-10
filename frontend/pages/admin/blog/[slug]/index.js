import { useEffect } from "react";
import moment from "moment";
import renderHTML from "react-render-html";

// actions
import { getSingleBlog, getRelatedBlog } from "../../../../redux/actions/blog";
import { getAllCategory } from "../../../../redux/actions/category";
import { getAllTag } from "../../../../redux/actions/tag";

// bootstrap
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";

// components
import Layout from "../../../../components/Layout";
import Loader from "../../../../components/Loader";
import Message from "../../../../components/Message";
import RelatedBlog from "../../../../components/Blog/RelatedBlog";

// env
import { APP_NAME, DOMAIN, FB_APP_ID, API } from "../../../../config";

// next
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { withRouter } from "next/router";

// redux
import { compose } from "redux";
import { connect } from "react-redux";

function blogSingle(props) {
  // destruct value props
  const {
    category,
    blog,
    getCategories,
    getTags,
    getSingleBlog,
    getRelatedBlog,
    router,
  } = props;

  // destruct blog
  const { createdBlog, loading, error, relatedBlog } = blog;

  // Get slug in param
  const { slug: blogSlug } = router.query;

  useEffect(() => {
    getCategories();
    getTags();
    getSingleBlog(blogSlug);
  }, [getCategories, getSingleBlog, getTags, blogSlug]);

  useEffect(() => {
    if (createdBlog) {
      const data = {
        _id: createdBlog._id,
        categories: createdBlog.categories,
      };
      getRelatedBlog(data);
    }
  }, [createdBlog, getRelatedBlog]);

  return (
    <>
      <Head>
        <title>
          {createdBlog?.title} | {APP_NAME}
        </title>
        <meta name="description" content={createdBlog?.mdescription} />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta
          property="og:title"
          content={`${createdBlog?.title} | ${APP_NAME}`}
        />
        <meta propery="og:description" content={createdBlog?.mdescription} />
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
          <Loader />
        ) : error ? (
          <Message color="danger">{error}</Message>
        ) : (
          <>
            <header>
              <Image
                src={`${API}/blog/photo/${createdBlog?.slug}`}
                width="1500"
                height="500"
                className="img img-fluid featured-image"
              />
            </header>

            <main className="mt-5">
              <Row>
                <Col md={9}>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <div className="d-flex align-items-center ">
                        <h6>Categories: </h6>
                        {createdBlog?.categories.map((x) => (
                          <p className="p-2" key={x._id}>
                            <Link href="/">
                              <a className="text-decoration-none text-white bg-primary p-1">
                                {x.name.toUpperCase()}
                              </a>
                            </Link>
                          </p>
                        ))}
                      </div>
                    </ListGroupItem>
                    <ListGroupItem>
                      <h1>{createdBlog?.title}</h1>
                      <div>{createdBlog && renderHTML(createdBlog?.body)}</div>
                    </ListGroupItem>
                    <ListGroupItem>
                      <div className="d-flex align-items-center ">
                        <h6>TAGS: </h6>

                        {createdBlog?.tags.map((x) => (
                          <p className="p-2" key={x._id}>
                            <Link href="/">
                              <a className="text-decoration-none text-white bg-info p-1">
                                {x.name.toUpperCase()}
                              </a>
                            </Link>
                          </p>
                        ))}
                      </div>
                    </ListGroupItem>
                  </ListGroup>
                </Col>

                <Col md={3}>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem className="border-left p-3">
                      <div className="d-flex flex-column align-items-end">
                        <div>
                          Written by{" "}
                          <b>{createdBlog?.postedBy.name.toUpperCase()}</b>
                        </div>
                        <text>
                          Published {moment(createdBlog?.updatedAt).fromNow()}
                        </text>
                      </div>
                    </ListGroupItem>
                    {/* related blog component */}
                    <RelatedBlog relatedBlog={relatedBlog} />
                  </ListGroup>
                </Col>
              </Row>
            </main>
          </>
        )}
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => ({
  category: state.category,
  blog: state.blog,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleBlog: (x) => dispatch(getSingleBlog(x)),
    getCategories: () => dispatch(getAllCategory()),
    getTags: () => dispatch(getAllTag()),
    getRelatedBlog: (x) => dispatch(getRelatedBlog(x)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(blogSingle);
