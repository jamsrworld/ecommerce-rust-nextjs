/* eslint-disable */
import "@jamsr-ui/editor/style.css";
import { Divider, Typography } from "@jamsr-ui/react";
import { slugify } from "@repo/utils";
import { isObject } from "@repo/utils/assertion";
import { CodeHighlight } from "./code-highlight";
import type {
  NodeHandler,
  NodeHandlers,
  NodeProps,
  TipTapNode,
} from "./renderer";
import { TipTapRender } from "./renderer";
import { YoutubeEmbed } from "./youtube-embed";

type NodeData = {
  node: React.ElementType;
  className?: string;
  attrs?: { style?: React.CSSProperties } & Record<string, unknown>;
};

const getTextNodeAttrs = (type: string, attrs: unknown): null | NodeData => {
  switch (type) {
    case "bold":
      return {
        node: "strong",
      };
    case "italic":
      return {
        node: "em",
      };
    case "underline":
      return {
        node: "u",
      };
    case "strike":
      return {
        node: "s",
      };
    case "code":
      return {
        node: "code",
      };
    case "link":
      if (!isObject(attrs)) return null;
      const { href, rel, target } = attrs as {
        href: string;
        rel?: string;
        target?: string;
      };
      return {
        node: "a",
        attrs: { href, rel, target },
      };
    default:
      return {
        node: "span",
      };
  }
};

const TextRender: NodeHandler = (props: NodeProps) => {
  const { node } = props;
  const { text, marks } = node;
  if (!text) return null;
  if (!marks?.length) return text;

  const lists = marks?.map((mark) => {
    const { type, attrs } = mark;
    return getTextNodeAttrs(type as string, attrs);
  });

  const Node = lists[0]?.node;
  if (!Node) return null;

  const items = lists.filter(Boolean) as NodeData[];

  const className = items.reduce((acc, { className }) => {
    return className ? `${acc} ${className}` : acc;
  }, "");

  const attrs = items.reduce(
    (acc, { attrs }) => {
      return attrs
        ? {
            ...acc,
            ...attrs,
            style: {
              ...acc.style,
              ...attrs.style,
            },
          }
        : acc;
    },
    {} as { style?: React.CSSProperties },
  );

  return <Node {...attrs}>{text}</Node>;
};

const Paragraph: NodeHandler = (props) => {
  const {
    children,
    node: { attrs },
  } = props;

  const style: React.CSSProperties = {};
  if (attrs) {
    if (attrs.textAlign) {
      style.textAlign = attrs.textAlign as React.CSSProperties["textAlign"];
    }
  }

  return (
    <Typography
      as="p"
      variant="body1"
      className="my-1 mb-2 leading-[1.9] tracking-wide text-foreground-secondary md:mb-4"
      style={style}
    >
      {children}
    </Typography>
  );
};

const HardBreak: NodeHandler = (props) => {
  return <br />;
};

const Passthrough: NodeHandler = (props) => {
  return <>{props.children}</>;
};

const ImageHandler: NodeHandler = (props) => {
  const { attrs } = props.node;
  if (!attrs) return null;
  if (!isObject(attrs)) return null;

  let { src, alt, height, placeholder, width } = attrs as {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    placeholder?: string;
  };
  return (
    <span className="relative block w-full">
      <img
        src={src}
        alt={alt!}
        {...(height && width
          ? {
              height,
              width,
            }
          : {})}
        {...(placeholder && {
          placeholder: "blur",
          blurDataURL: placeholder,
        })}
        className="rounded"
        crossOrigin="anonymous"
      />
    </span>
  );
};

const Heading: NodeHandler = (props) => {
  const { attrs, content } = props.node;
  const { level } = attrs as {
    level: number;
  };
  if (typeof level !== "number") return null;
  if (level > 6) return null;

  const as = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const { children } = props;

  const text = content?.map((item) => item.text).join(" ") || "";
  const slug = slugify(text);
  if (slug) {
    return (
      <Typography
        as="a"
        variant={as}
        id={slug}
        className="mb-2"
        href={`#${slug}`}
        data-heading
      >
        {children}
      </Typography>
    );
  }

  return (
    <Typography
      as={as}
      variant={as}
    >
      {props.children}
    </Typography>
  );
};

const BulletList: NodeHandler = (props) => {
  const { attrs } = props.node;
  return <ul>{props.children}</ul>;
};

const ListItem: NodeHandler = (props) => {
  return <li>{props.children}</li>;
};

const HorizontalRule: NodeHandler = (props) => {
  return <Divider className="my-4" />;
};

const CodeBlock: NodeHandler = (props) => {
  return <CodeHighlight code={props.children} />;
};

const Blockquote: NodeHandler = (props) => {
  const content = props.children;
  return <blockquote>{content}</blockquote>;
};

const Youtube: NodeHandler = (props) => {
  const { src } = props.node.attrs || {};
  if (typeof src !== "string") return null;
  return <YoutubeEmbed src={src} />;
};

// create a handlers wrapper
const handlers: NodeHandlers = {
  text: TextRender,
  paragraph: Paragraph,
  doc: Passthrough,
  hardBreak: HardBreak,
  image: ImageHandler,
  heading: Heading,
  bulletList: BulletList,
  listItem: ListItem,
  horizontalRule: HorizontalRule,
  codeBlock: CodeBlock,
  blockquote: Blockquote,
  youtube: Youtube,
};

type Props = {
  data: Record<string, unknown>;
};

export const EditorRender = (props: Props) => {
  const { data } = props;
  return (
    <div className="tiptap">
      <TipTapRender
        node={data as TipTapNode}
        handlers={handlers}
      />
    </div>
  );
};
