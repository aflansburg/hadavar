import { AllBooks } from "../books.json";

export default function(
  { currBookIndex, currChapterIndex, length },
  operation
) {
  const BOOK_LIMIT = AllBooks.length;
  let res = {};

  /* basic back and forward - calculates based on length provided in AllBooks array of books.json
   could refactor to not use ternaries and confusing `- 1 | + 1` notation - prob be a better way
   although this shouldn't need to be touched again unless need to skip fwd or bkwd by more than a single chapter
   or if navigate to individual verse -- future feature 
  */
  switch (operation) {
    case "next": {
      if (currChapterIndex + 1 >= length) {
        res["book"] = currBookIndex + 1 < BOOK_LIMIT ? currBookIndex + 1 : 0;
        res["chapter"] = 0;
      } else {
        res["book"] = currBookIndex;
        res["chapter"] = currChapterIndex + 1;
      }
      break;
    }
    case "prev": {
      if (currChapterIndex - 1 >= 0) {
        res["book"] = currBookIndex;
        res["chapter"] = currChapterIndex - 1;
      } else {
        res["book"] =
          currBookIndex - 1 >= 0 ? currBookIndex - 1 : BOOK_LIMIT - 1;
        res["chapter"] = AllBooks[res.book].length - 1;
      }
      break;
    }
    default:
      res["book"] = 0;
      res["chapter"] = 0;
      break;
  }
  return `/passages/passage?book=${res.book}&chapterIndex=${res.chapter}`;
}
