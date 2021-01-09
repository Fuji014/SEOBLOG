// bootstrap
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

// next
import Link from "next/link";

function Paginate(props) {
  // decustruct props
  const { pages, page, isAdmin = false, keyword = "" } = props;

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <PaginationItem active={x + 1 === page} key={x + 1}>
            <PaginationLink
              href={
                keyword
                  ? `/admin/blog/search/${keyword}/page/${x + 1}`
                  : `/admin/blog/page/${x + 1}`
              }
            >
              {x + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
