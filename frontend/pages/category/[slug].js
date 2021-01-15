import { useEffect } from "react";
import moment from "moment";
import renderHTML from "react-render-html";

// actions
import { getBlogByCategory } from "../../redux/actions/blog";

// bootstrap
import { Nav, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

// components
import Layout from "../../components/Layout";
import LatestBlog from "../../components/Blog/LatestBlog";
import BreadCrub from "../../components/BreadCrub";

// config
import { API } from "../../config";

// next
import { withRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

// redux
import { compose } from "redux";
import { connect } from "react-redux";

function Category(props) {
  // destruct props
  const { blog, getBlogByCategory, router } = props;

  // destruct category
  const { blogs, loading, error } = blog;

  // get slug param
  const { slug: blogSlug } = router.query;

  // breadCrub
  const bread = [
    { name: "Home", path: "/" },
    { name: "Category", path: `/category/${blogSlug}` },
  ];

  // useEffect
  useEffect(() => {
    getBlogByCategory(blogSlug);
  }, [getBlogByCategory, blogSlug]);

  return (
    <Layout>
      <BreadCrub bread={bread} />

      <h1>UNCATEGORIZED</h1>
      <Row>
        <Col md={9}>
          <ListGroup className="list-group-flush">
            {blogs?.map((x) => (
              <ListGroupItem className="py-5">
                <Row>
                  <Col md={5}>
                    <Link href={`/admin/blog/${x.slug}`}>
                      <a className="text-decoration-none">
                        <Image
                          src={`${API}/blog/photo/${x.slug}`}
                          alt={x.title}
                          className="img-fluid"
                          width={400}
                          height={250}
                        />
                      </a>
                    </Link>
                  </Col>
                  <Col md={7}>
                    <Link href={`/admin/blog/${x.slug}`}>
                      <a className="text-decoration-none">
                        <h2>{x.title}</h2>
                        <h6 className="text-muted">
                          {moment(x.updatedAt).fromNow()}
                        </h6>
                        <h6>{x.exerpt && renderHTML(x.exerpt)}</h6>
                      </a>
                    </Link>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md={3} className="bg-muted">
          <ListGroup className="list-group-flush ">
            <LatestBlog />
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
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Category);
