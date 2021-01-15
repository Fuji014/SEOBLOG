// bootsrap
import { Nav } from "reactstrap";

// next
import { withRouter } from "next/router";
import Link from "next/link";

function BreadCrub(props) {
  const { bread } = props;

  return (
    <Nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {bread.map((x) => (
          <li className="breadcrumb-item">
            <h5>
              <Link href={x.path}>
                <a>{x.name}</a>
              </Link>
            </h5>
          </li>
        ))}
      </ol>
    </Nav>
  );
}

BreadCrub.defaultProps = {
  bread: [
    { name: "Test", path: "/" },
    { name: "Data", path: "/" },
  ],
};

export default withRouter(BreadCrub);
