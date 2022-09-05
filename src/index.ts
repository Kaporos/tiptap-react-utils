// @ts-ignore
import { Editor, Extension, mergeAttributes, NodeConfig, ReactNodeViewRenderer } from '@tiptap/react';
// @ts-ignore
import { ClassType, Component } from 'react';

export function getBasicNodeConfiguration(
  nodeName: string,
  reactComponent: Component,
  attributes: object | ClassType<any, any, any>,
): Partial<NodeConfig> {
  return {
    title: nodeName,
    addAttributes() {
      return getAttributes(attributes);
    },
    parseHTML() {
      return [
        {
          tag: nodeName,
        },
      ];
    },
    // @ts-ignore
    renderHTML({ HTMLAttributes }) {
      return [nodeName, mergeAttributes(HTMLAttributes)];
    },
    addNodeView() {
      return ReactNodeViewRenderer(reactComponent);
    },
  };
}

export function getAttributes(sample: object | ClassType<any, any, any>) {
  if (typeof sample === 'function') {
    sample = new sample();
  }
  const keys: string[] = Object.keys(sample);
  const attributes: { [key: string]: any } = {};
  keys.forEach((key) => {
    attributes[key] = { default: sample[key] };
  });
  return attributes;
}

export interface NodeProps<T> {
  node: {
    attrs: T;
  };
  editor: Editor;
  extension: Extension;
  deleteNode: () => void;
  getPos: () => number;
  selected: boolean;
  updateAttributes: (newAttributes: T) => void;
}
