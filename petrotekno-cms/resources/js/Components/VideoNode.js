import { Node, mergeAttributes } from '@tiptap/core';

// Keep uploaded videos in Tiptap's document instead of dropping unknown <video> tags.
export default Node.create({
    name: 'uploadedVideo',
    group: 'block',
    atom: true,
    draggable: true,

    addAttributes() {
        return {
            src: {
                default: null,
                parseHTML: (element) => element.getAttribute('src') || element.querySelector('source')?.getAttribute('src'),
            },
        };
    },

    parseHTML() {
        return [{ tag: 'video' }];
    },

    renderHTML({ HTMLAttributes }) {
        return ['video', mergeAttributes({ controls: 'controls', preload: 'metadata' }, HTMLAttributes)];
    },
});
