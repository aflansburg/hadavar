import fetch from "isomorphic-unfetch";
import PassageReader from "../../src/Reader/PassageReader";
import { AllBooks } from "../../src/books.json";

function Passage({ passage, title, navData }) {
  return <PassageReader passage={passage} title={title} navData={navData} />;
}

Passage.getInitialProps = async context => {
  const { book } = context.query;
  const chapter = context.query.chapter || 0;
  const res = await fetch(
    `https://hadavar-79b0d.firebaseio.com/${book}/chapters/${chapter}.json`
  );
  const passage = await res.json();

  const title = AllBooks[book].name;

  const navData = {
    currBookIndex: Number(book),
    currChapterIndex: Number(chapter),
    length: AllBooks[book].length
  };

  return { passage, title, navData };
};

export default Passage;
