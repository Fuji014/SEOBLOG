import { useState, useEffect } from "react";

// actions
import { getAllCategory } from "../../../../redux/actions/category";
import { getAllTag } from "../../../../redux/actions/tag";
import { getSingleBlog, updateBlog } from "../../../../redux/actions/blog";

// bootstrap
import {
  Button,
  FormGroup,
  Form,
  Label,
  Input,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

// components
import Layout from "../../../../components/Layout";
import Admin from "../../../../components/Private/admin";
import Loader from "../../../../components/Loader";
import Message from "../../../../components/Message";

// env
import { API } from "../../../../config";

// next
import Link from "next/link";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";

// quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// redux
import { compose } from "redux";
import { connect } from "react-redux";

function blogEdit(props) {
  // destruct props
  const {
    blog,
    category: categoryStore,
    tag: tagStore,
    getSingleBlog,
    getAllCategory,
    getAllTag,
    updateBlog,
    router,
  } = props;

  // destruct blog
  const { createdBlog, updateSuccess, loading, error } = blog;

  // destruct category
  const { category: categories } = categoryStore;

  // destruct tag
  const { tags } = tagStore;

  // get slug param
  const { slug: blogSlug } = router.query;

  // useState
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState([]);
  const [categoryInput, setCategoryInput] = useState([]);
  const [tagInput, setTagInput] = useState([]);

  // useEffect
  useEffect(() => {
    if (!createdBlog?.slug || createdBlog?.slug !== blogSlug) {
      getAllCategory();
      getAllTag();
      getSingleBlog(blogSlug);
    } else {
      setTitle(createdBlog.title);
      setBody(createdBlog.body);
      setCategory(createdBlog.categories.map((x) => x._id));
      setTag(createdBlog.tags.map((x) => x._id));
      setPhoto(createdBlog.photo);
      setStatus(createdBlog.status);
      setCategoryInput(categories);
      setTagInput(tags);
    }
  }, [blogSlug, createdBlog, getAllCategory, getAllTag, getSingleBlog]);

  useEffect(() => {
    if (updateSuccess) {
      props.router.push("/admin/blog");
    }
  }, [updateSuccess, props.router]);

  // functions
  const checkCategoryHandle = (id) => {
    const result = category.indexOf(id);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const checkTagHandle = (id) => {
    const result = tag.indexOf(id);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const checkStatusHandle = () => {
    if (status) {
      return true;
    } else {
      return false;
    }
  };

  const checkToggleHandle = (id) => {
    let array = [...category];
    const clickCategory = category.indexOf(id);
    clickCategory === -1 ? array.push(id) : array.splice(clickCategory, 1);
    setCategory(array);
  };

  const tagToggleHandle = (id) => {
    let array = [...tag];
    const clickTag = tag.indexOf(id);
    clickTag === -1 ? array.push(id) : array.splice(clickTag, 1);
    setTag(array);
  };

  const uploadHandle = (e) => {
    setPhoto(e.target.files[0]);
  };

  const updateBlogHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("categories", category);
    formData.append("photo", photo);
    formData.append("status", status);
    updateBlog(formData, blogSlug);
  };

  // debug

  return (
    <Layout>
      <Admin>
        <Link href="/admin/blog">
          <Button className="my-3" color="light">
            Go Back
          </Button>
        </Link>
        <h1>Edit Blog</h1>
        {loading && <Loader />}
        {error && <Message color="danger">{error}</Message>}
        <Form onSubmit={updateBlogHandler} encType="multipart/form-data">
          <Row>
            <Col md={8}>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={createdBlog?.status}
                />
              </FormGroup>
              <FormGroup>
                <Label>Body</Label>
                <ReactQuill
                  modules={blogEdit.modules}
                  formats={blogEdit.formats}
                  placeholder="Write something amazing..."
                  value={body}
                  onChange={(e) => setBody(e)}
                />
              </FormGroup>

              <FormGroup>
                <ListGroup>
                  <ListGroupItem>
                    <div className="custom-control custom-switch">
                      <Input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitch1"
                        onChange={() => setStatus(!status)}
                        checked={checkStatusHandle()}
                      />
                      <Label
                        className="custom-control-label"
                        for="customSwitch1"
                      >
                        Blog status
                      </Label>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </FormGroup>
            </Col>
            <Col md={4}>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <FormGroup>
                    <Label>Photo</Label>
                    {createdBlog?.photo && (
                      <div className="container-fluid">
                        <section>
                          <div className="row">
                            <Image
                              src={`${API}/blog/photo/${blogSlug}`}
                              alt={title}
                              className="img-fluid"
                              width={350}
                              height={150}
                            />
                          </div>
                        </section>
                      </div>
                    )}
                    <Input
                      type="file"
                      name="photo"
                      onChange={uploadHandle}
                      className="my-3"
                    />
                  </FormGroup>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="form-check">
                    <h4>Categories</h4>
                    <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {categoryInput.map((x) => (
                        <li key={x._id}>
                          <Input
                            type="checkbox"
                            onChange={() => checkToggleHandle(x._id)}
                            checked={checkCategoryHandle(x._id)}
                          />
                          <Label className="form-check-label">{x.name}</Label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ListGroupItem>

                <ListGroupItem>
                  <div className="form-check">
                    <h4>Tags</h4>
                    <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {tagInput.map((x) => (
                        <li key={x._id}>
                          <Input
                            type="checkbox"
                            onChange={() => tagToggleHandle(x._id)}
                            checked={checkTagHandle(x._id)}
                          />
                          <Label className="form-check-label">{x.name}</Label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>

          <Button color="primary" type="submit">
            Update
          </Button>
        </Form>
      </Admin>
    </Layout>
  );
}

blogEdit.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

blogEdit.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

const mapStateToProps = (state) => ({
  blog: state.blog,
  category: state.category,
  tag: state.tag,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleBlog: (x) => dispatch(getSingleBlog(x)),
    getAllCategory: () => dispatch(getAllCategory()),
    getAllTag: () => dispatch(getAllTag()),
    updateBlog: (x, y) => dispatch(updateBlog(x, y)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(blogEdit);
