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
        {bread.map((x, i) => (
          <li className="breadcrumb-item" key={i}>
            <Link href={x.path}>
              <a className="text-decoration-none">{x.name}</a>
            </Link>
          </li>
        ))}
      </ol>
    </Nav>
  );
}

BreadCrub.defaultProps = {
  bread: [
    { name: "Test", path: "/", active: false },
    { name: "Data", path: "/", active: true },
  ],
};

export default withRouter(BreadCrub);
