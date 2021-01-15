import { useEffect } from "react";

import moment from "moment";

// action
import { getLatestBLog } from "../../redux/actions/blog";

// bootstrap
import { ListGroupItem, Row, Col } from "reactstrap";

// config
import { API } from "../../config";

// next
import Image from "next/image";
import Link from "next/link";

// redux
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "next/router";

function LatestBlog(props) {
  // destruct props
  const { blog, getLatestBLog } = props;
  // destruct blog
  const { latestBlog } = blog;

  useEffect(() => {
    getLatestBLog();
  }, [getLatestBLog]);

  return (
    <>
      <h4 className="p-3">Latest Blogs</h4>
      {latestBlog?.map((x) => (
        <ListGroupItem className="bg-muted py-3">
          <Link href={`/admin/blog/${x.slug}`}>
            <a className="text-decoration-none">
              <Row>
                <Col>
                  <Image
                    src={`${API}/blog/photo/${x.slug}`}
                    alt={x.title}
                    className="img-fluid"
                    layout="fill"
                  />
                </Col>
                <Col>
                  <div className="d-flex flex-column">
                    <h6>{x.title}</h6>
                    <h6 className="text-muted">
                      {moment(x.updatedAt).fromNow()}
                    </h6>
                  </div>
                </Col>
              </Row>
            </a>
          </Link>
        </ListGroupItem>
      ))}
    </>
  );
}

const mapStateToProps = (state) => ({
  blog: state.blog,
});

const mapDispatchToProps = (dispatch) => ({
  getLatestBLog: () => dispatch(getLatestBLog()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(LatestBlog);
