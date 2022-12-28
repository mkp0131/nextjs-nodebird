import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postContent }) => {
  const regexp = /(#[^\s#]+)/g;
  return postContent.split(regexp).map((word, index) => {
    if (word.match(regexp)) {
      return (
        <Link
          href={`/hashtag/${word.slice(1)}`}
          key={index}
        >
          <a>{word}</a>
        </Link>
      );
    }
    return word;
  });
};

PostCardContent.propTypes = {
  postContent: PropTypes.string.isRequired,
};

export default PostCardContent;
