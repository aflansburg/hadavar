import fetch from "isomorphic-unfetch";
import PassageReader from "../../src/Reader/PassageReader";
import { AllBooks } from "../../src/books.json";

function Passage({ passage, title }) {
  return <PassageReader passage={passage} title={title} />;
}

Passage.getInitialProps = async context => {
  const { book } = context.query;
  const chapter = context.query.chapter || 0;
  const res = await fetch(
    `https://hadavar-79b0d.firebaseio.com/${book}/chapters/${chapter}.json`
  );
  const passage = await res.json();
  const title = AllBooks[book].name;
  return { passage, title };
};

export default Passage;
