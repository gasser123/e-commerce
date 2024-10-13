import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [keyWord, setKeyWord] = useState<string>(search || "");

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (keyWord.trim()) {
      navigate(`/?search=${keyWord}`);
      setKeyWord("");
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => {
          setKeyWord(e.target.value);
        }}
        value={keyWord}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        {" "}
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
