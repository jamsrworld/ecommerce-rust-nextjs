/* eslint-disable */
import React from "react";

export function TipTapRender(props: {
  node: TipTapNode;
  handlers: NodeHandlers;
}): React.ReactNode {
  const { node, handlers: mapping } = props;
  // recursively render child content
  const children: React.ReactNode[] = [];
  node.content &&
    node.content.forEach((child, ix) => {
      children.push(
        <TipTapRender
          node={child}
          handlers={mapping}
          key={`${child.type}-${ix}`}
        />,
      );
    });

  // return empty if we are missing a handler for this type
  if (!(node.type in props.handlers)) {
    console.warn(`missing type`, node);
    return null;
  }

  // render the handler for this type
  const Handler = mapping[node.type]!;
  return <Handler node={node}>{children}</Handler>;
}

type Attrs = Readonly<Record<string, unknown>>;

export interface TipTapNode {
  type: string;
  attrs?: Attrs;
  marks?: { type: string } & Attrs[];
  content?: TipTapNode[];
  text?: string;
  readonly [attr: string]: unknown;
}

export interface NodeProps {
  children?: React.ReactNode;
  node: TipTapNode;
}

export type NodeHandler = (props: NodeProps) => React.ReactNode;

export type NodeHandlers = Readonly<Record<string, NodeHandler>>;
