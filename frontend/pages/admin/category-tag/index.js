import { useState, useEffect } from "react";

// components
import Layout from "../../../components/Layout";
import Admin from "../../../components/Private/admin";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";

// bootrap
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

// actions
import {
  createCategory as createCategoryFunction,
  getAllCategory,
  deleteCategory,
} from "../../../redux/actions/category";
import { getAllTag, createTag, deleteTag } from "../../../redux/actions/tag";

// redux
import { useDispatch, useSelector } from "react-redux";

const categoryTag = () => {
  const dispatch = useDispatch();

  // category store
  const categoryStore = useSelector((state) => state.category);
  const { category, loading, error, success, createCategory } = categoryStore;
  const { loading: loadingCreate, error: errorCreate } = createCategory;
  // tag store
  const tagStore = useSelector((state) => state.tag);
  const { tags, loading: loadingTag, error: errorTag } = tagStore;

  // useStates
  const [categoryInput, setCategoryInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  // useEffect
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllTag());
  }, [dispatch]);

  // functions
  const categorySubmitHandle = (e) => {
    e.preventDefault();
    const data = {
      name: categoryInput,
    };

    setCategoryInput("");
    dispatch(createCategoryFunction(data));
  };

  const tagSubmitHandle = (e) => {
    e.preventDefault();
    const data = {
      name: tagInput,
    };

    setTagInput("");
    dispatch(createTag(data));
  };

  const deleteTagHandle = (data) => {
    if (confirm("Are you sure you want to delete this?")) {
      dispatch(deleteTag(data));
    }
  };

  const deleteCategoryHandle = (data) => {
    if (confirm("Are you sure you want to delete this?")) {
      dispatch(deleteCategory(data));
    }
  };
  return (
    <Layout>
      <Admin>
        <Row>
          <Col md={6}>
            <h2>Category</h2>
            {loading || loadingCreate ? <Loader /> : ""}
            {error || errorCreate ? (
              <Message color="danger">{errorCreate || error}</Message>
            ) : (
              ""
            )}
            <Form onSubmit={categorySubmitHandle}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Enter category name"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                ></Input>
              </FormGroup>
              <Button type="submit" color="primary" className="btn-block">
                Create
              </Button>
            </Form>

            {category.length === 0 ? (
              <Message color="danger" className="mt-3">
                No category found
              </Message>
            ) : (
              category.map((x, i) => (
                <Button
                  key={i}
                  className="btn btn-outline-primary mr-1 ml-1 mt-3"
                  onClick={() => {
                    deleteCategoryHandle(x.slug);
                  }}
                >
                  {x.slug}
                </Button>
              ))
            )}
          </Col>
          <Col md={6}>
            <h2>Tag</h2>
            {loadingTag && <Loader />}
            {errorTag && <Message color="danger">{errorTag}</Message>}
            <Form onSubmit={tagSubmitHandle}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Enter tag name"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                ></Input>
              </FormGroup>
              <Button type="submit" color="primary" className="btn-block">
                Create
              </Button>
            </Form>

            {tags.length === 0 ? (
              <Message color="danger" className="mt-3">
                No tags found
              </Message>
            ) : (
              tags.map((x, i) => (
                <Button
                  key={i}
                  className="btn btn-outline-primary mr-1 ml-1 mt-3"
                  onClick={() => {
                    deleteTagHandle(x.slug);
                  }}
                >
                  {x.slug}
                </Button>
              ))
            )}
          </Col>
        </Row>
      </Admin>
    </Layout>
  );
};

export default categoryTag;
