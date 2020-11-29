import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Comments = ({ id }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await axios.get(
          `http://hn.algolia.com/api/v1/search?tags=comment,story_${id}`
        );
        console.log(res.data.hits);
        setList(res.data.hits);
      };
      fetch();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <>Loading... </>;
  }
  return (
    <>
      {list.map(x => (
        <Container key={x.objectID}>
          <Link to={`/author/${x.author}`}>{x.author}</Link> : {x.comment_text}
        </Container>
      ))}
    </>
  );
};

export default Comments;