import { useState } from "react";

// bootstrap
import { Form, Input, Button } from "reactstrap";

import { withRouter } from "next/router";

function SearchBox(props) {
  // destruct props
  const { router } = props;

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/admin/blog/search/${keyword}`);
    } else {
      router.push("/admin/blog/all");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="form-inline my-2 my-lg-0">
      <Input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button color="primary" className="my-2 my-sm-0" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default withRouter(SearchBox);
