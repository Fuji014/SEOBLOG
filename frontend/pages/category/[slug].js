import { useEffect } from "react";
import moment from "moment";
import renderHTML from "react-render-html";

// actions
import { getBlogByCategory, getLatestBLog } from "../../redux/actions/blog";

// bootstrap
import { Nav, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

// components
import Layout from "../../components/Layout";
import LatestBlog from "../../components/Blog/LatestBlog";

// config
import { API } from "../../config";

// next
import { withRouter } from "next/router";
import Image from "next/image";

// redux
import { compose } from "redux";
import { connect } from "react-redux";

function Category(props) {
  // destruct props
  const { blog, getBlogByCategory, getLatestBLog, router } = props;

  // destruct category
  const { blogs, latestBlog, loading, error } = blog;

  // get slug param
  const { slug: blogSlug } = router.query;

  // useEffect
  useEffect(() => {
    getBlogByCategory(blogSlug);
    getLatestBLog();
  }, [getBlogByCategory, getLatestBLog, blogSlug]);

  return (
    <Layout>
      <Nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <h5>
              <a href="#">Home</a>
            </h5>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <h5>Category</h5>
          </li>
        </ol>
      </Nav>

      <h1>UNCATEGORIZED</h1>
      <Row>
        <Col md={9}>
          <ListGroup className="list-group-flush">
            {blogs?.map((x) => (
              <ListGroupItem>
                <Row>
                  <Col md={5}>
                    <Image
                      src={`${API}/blog/photo/${x.slug}`}
                      alt={x.title}
                      className="img-fluid"
                      width={350}
                      height={250}
                    />
                  </Col>
                  <Col md={7}>
                    <h2>{x.title}</h2>
                    <h6 className="text-muted">
                      {moment(x.updatedAt).fromNow()}
                    </h6>
                    <h6>{x.exerpt && renderHTML(x.exerpt)}</h6>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md={3} className="bg-muted">
          <ListGroup className="list-group-flush ">
            <LatestBlog latestBlog={latestBlog} />
          </ListGroup>
        </Col>
      </Row>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  blog: state.blog,
});

const mapDispatchToProps = (dispatch) => ({
  getBlogByCategory: (x) => dispatch(getBlogByCategory(x)),
  getLatestBLog: () => dispatch(getLatestBLog()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Category);
