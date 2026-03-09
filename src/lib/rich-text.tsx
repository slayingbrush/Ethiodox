import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let cursor = 0;
  let match = pattern.exec(text);
  let key = 0;

  while (match) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }

    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(<strong key={`strong-${key++}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") && token.endsWith("*")) {
      nodes.push(<em key={`em-${key++}`}>{token.slice(1, -1)}</em>);
    } else {
      nodes.push(token);
    }

    cursor = match.index + token.length;
    match = pattern.exec(text);
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

export function renderRichText(content: string) {
  const lines = content.trim().split("\n");
  const elements: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = () => {
    if (!listType || listItems.length === 0) return;
    const listKey = `list-${elements.length}`;
    if (listType === "ul") {
      elements.push(
        <ul key={listKey} className="list-disc pl-6">
          {listItems.map((item, idx) => (
            <li key={`ul-${idx}`}>{item}</li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={listKey} className="list-decimal pl-6">
          {listItems.map((item, idx) => (
            <li key={`ol-${idx}`}>{item}</li>
          ))}
        </ol>
      );
    }
    listItems = [];
    listType = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(<h3 key={`h3-${elements.length}`}>{renderInline(trimmed.slice(4))}</h3>);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(<h2 key={`h2-${elements.length}`}>{renderInline(trimmed.slice(3))}</h2>);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(<h1 key={`h1-${elements.length}`}>{renderInline(trimmed.slice(2))}</h1>);
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (listType !== "ul") flushList();
      listType = "ul";
      listItems.push(renderInline(trimmed.slice(2)));
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== "ol") flushList();
      listType = "ol";
      listItems.push(renderInline(trimmed.replace(/^\d+\.\s/, "")));
      continue;
    }

    flushList();
    elements.push(<p key={`p-${elements.length}`}>{renderInline(trimmed)}</p>);
  }

  flushList();
  return elements;
}
