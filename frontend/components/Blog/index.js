import renderHTML from "react-render-html";
import moment from "moment";

// components
import { ListGroupItem, Row, Col } from "reactstrap";

// next
import Link from "next/link";
import Image from "next/Image";

function Blog({ blog }) {
  return (
    <ListGroupItem key={blog._id} className="py-5">
      <Row>
        <Col md={8}>
          <div className="d-flex">
            {blog.categories.map((y) => (
              <p className="mr-2" key={y._id}>
                <Link href="/">
                  <a className="text-decoration-none text-white bg-primary p-1">
                    {y.name.toUpperCase()}
                  </a>
                </Link>
              </p>
            ))}
          </div>
          <section className="my-2">
            <Link href={`/admin/blog/${blog.slug}`}>
              <a className="text-decoration-none">
                <h2>{blog.title}</h2>

                <h5>{renderHTML(blog.exerpt)}</h5>
              </a>
            </Link>
          </section>
          <div className="d-flex my-4">
            <img
              src="/images/img_avatar.png"
              alt="Sample.jpg"
              style={{ height: "50px" }}
            />
            <div className="d-flex flex-column mx-4">
              <div>
                by <strong>{blog.postedBy.name.toUpperCase()}</strong>
              </div>
              {moment(blog.updatedAt).fromNow()}
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Image
            src={`http://localhost:8000/api/blog/photo/${blog.slug}`}
            alt={blog.name}
            layout="responsive"
            width={550}
            height={450}
            className="img-fluid shadow  mb-5"
          />
        </Col>
      </Row>
    </ListGroupItem>
  );
}

export default Blog;
