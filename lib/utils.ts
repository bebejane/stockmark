import { render, renderNodeRule } from 'datocms-structured-text-to-html-string';
import { isHeading, isInlineBlock } from 'datocms-structured-text-utils';

export function extractHeaders(content: any): { text: string; className: string }[] {
  const headers = [];
  render(content, {
    customNodeRules: [
      renderNodeRule(isHeading, ({ adapter: { renderNode }, node, children, key }) => {
        headers.push({ text: children.join(''), className: node.style });
        return renderNode(`h${node.level + 1}`, { key, className: 'right' }, children);
      }),
      renderNodeRule(isInlineBlock, ({ adapter: { renderNode }, node, children, key }) => {
        // Replace with video thumbnail
        return '###';
      }),
    ],
  });
  return headers;
}