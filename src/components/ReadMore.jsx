import { useState } from "react";

const breakText = (text) => {
  if (!text) return "";
  const segments = [];
  while (text.length > 0) {
    segments.push(text.substring(0, 90));
    text = text.substring(90);
  }
  return segments.join("<br/>");
};

const ReadMore = ({ text = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const brokenText = breakText(text);
  return (
    <span>
      <span
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? brokenText
            : `${text?.substring(0, 90)}` !== "undefined"
            ? `${text?.substring(0, 90)}`
            : "",
        }}
      />
      {text && text.length > 90 && (
        <span
          onClick={toggleReadMore}
          style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </span>
      )}
    </span>
  );
};

export default ReadMore;
