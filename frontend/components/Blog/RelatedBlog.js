import moment from "moment";

// bootstrap
import { ListGroup, ListGroupItem } from "reactstrap";

// config
import { API } from "../../config";

// next
import Link from "next/link";
import Image from "next/image";

function RelatedBlog(props) {
  // destruct props
  const { relatedBlog } = props;

  return (
    <>
      <h4 className="p-3">Related Blogs</h4>
      {relatedBlog?.map((x) => (
        <ListGroupItem>
          <Link href={`/admin/blog/${x.slug}`}>
            <a className="d-flex justify-content-between text-decoration-none">
              <Image
                src={`${API}/blog/photo/${x.slug}`}
                alt={x.title}
                className="img-fluid"
                width={100}
                height={60}
              />

              <div className="d-flex  flex-column">
                <h5>{x.title}</h5>
                <h6 className="text-muted">{moment(x.updatedAt).fromNow()}</h6>
              </div>
            </a>
          </Link>
        </ListGroupItem>
      ))}
    </>
  );
}

export default RelatedBlog;
