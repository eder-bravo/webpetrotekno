import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import VideoNode from './VideoNode';
import { useCallback, useRef, useState, useEffect, memo } from 'react';
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Image as ImageIcon,
    Link as LinkIcon,
    Youtube as YoutubeIcon,
    Video,
    Heading1,
    Heading2,
    Heading3,
    Minus,
    Unlink,
    Maximize2,
    X,
    Edit3,
    Loader2,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';

// Toolbar button component - memoized to prevent re-renders
const ToolbarButton = memo(({ onClick, isActive, children, title, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            isActive 
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        title={title}
    >
        {children}
    </button>
));

const ToolbarDivider = memo(() => (
    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
));

// Toolbar component - receives editor instance
const EditorToolbar = memo(({ editor, uploading, uploadStatus, onImageClick, onVideoClick, onYoutubeClick, onLinkClick }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="Negrita (Ctrl+B)"
                disabled={uploading}
            >
                <Bold className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="Cursiva (Ctrl+I)"
                disabled={uploading}
            >
                <Italic className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
                title="Tachado"
                disabled={uploading}
            >
                <Strikethrough className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                title="Título 1"
                disabled={uploading}
            >
                <Heading1 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                title="Título 2"
                disabled={uploading}
            >
                <Heading2 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editor.isActive('heading', { level: 3 })}
                title="Título 3"
                disabled={uploading}
            >
                <Heading3 className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                title="Lista con viñetas"
                disabled={uploading}
            >
                <List className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                title="Lista numerada"
                disabled={uploading}
            >
                <ListOrdered className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                title="Cita"
                disabled={uploading}
            >
                <Quote className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                isActive={false}
                title="Línea horizontal"
                disabled={uploading}
            >
                <Minus className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            <ToolbarButton
                onClick={onLinkClick}
                isActive={editor.isActive('link')}
                title="Enlace"
                disabled={uploading}
            >
                <LinkIcon className="w-4 h-4" />
            </ToolbarButton>
            {editor.isActive('link') && (
                <ToolbarButton
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    isActive={false}
                    title="Quitar enlace"
                    disabled={uploading}
                >
                    <Unlink className="w-4 h-4" />
                </ToolbarButton>
            )}

            <ToolbarDivider />

            <ToolbarButton
                onClick={onImageClick}
                isActive={false}
                title="Subir imagen"
                disabled={uploading}
            >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
            </ToolbarButton>
            <ToolbarButton
                onClick={onYoutubeClick}
                isActive={false}
                title="Video de YouTube"
                disabled={uploading}
            >
                <YoutubeIcon className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={onVideoClick}
                isActive={false}
                title="Subir video MP4"
                disabled={uploading}
            >
                <Video className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                isActive={false}
                title="Deshacer (Ctrl+Z)"
                disabled={uploading}
            >
                <Undo className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                isActive={false}
                title="Rehacer (Ctrl+Y)"
                disabled={uploading}
            >
                <Redo className="w-4 h-4" />
            </ToolbarButton>

            {/* Upload status */}
            {uploadStatus && (
                <div className={`ml-auto flex items-center text-sm ${
                    uploadStatus.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                    {uploadStatus.type === 'success' ? (
                        <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                        <AlertCircle className="w-4 h-4" />
                    )}
                    {uploadStatus.message}
                </div>
            )}
        </div>
    );
});

function TiptapEditor({ content, onChange, placeholder = 'Escribe el contenido aquí...' }) {
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [previewText, setPreviewText] = useState('');
    
    // Store the current content internally - NEVER call onChange while typing
    const currentContentRef = useRef(content || '');

    // Create editor with stable configuration
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg my-4',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline hover:text-blue-600',
                },
            }),
            Youtube.configure({
                width: '100%',
                height: 400,
                HTMLAttributes: {
                    class: 'w-full aspect-video rounded-lg my-4',
                },
            }),
            VideoNode,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            // ONLY update local state and preview - NEVER call onChange here
            currentContentRef.current = editor.getHTML();
            const text = editor.getText();
            setPreviewText(text.length > 100 ? text.substring(0, 100) + '...' : text);
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
            },
        },
    });

    // Keep the editor in sync when Inertia opens another record in the same form.
    useEffect(() => {
        if (!editor || isFullscreen) return;
        const nextContent = content || '';
        if (nextContent !== currentContentRef.current) {
            currentContentRef.current = nextContent;
            editor.commands.setContent(nextContent, { emitUpdate: false });
        }
        const text = editor.getText();
        setPreviewText(text.length > 100 ? text.substring(0, 100) + '...' : text);
    }, [editor, content]);

    // Clear upload status after 3 seconds
    useEffect(() => {
        if (uploadStatus) {
            const timer = setTimeout(() => setUploadStatus(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [uploadStatus]);

    // Handle ESC key to close fullscreen
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isFullscreen) {
                handleCloseFullscreen();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen]);

    // ONLY sync content to parent when closing the modal - this prevents focus loss
    const handleCloseFullscreen = useCallback(() => {
        if (editor) {
            onChange(currentContentRef.current);
        }
        setIsFullscreen(false);
    }, [editor, onChange]);

    const addImage = useCallback(async (file) => {
        if (!file || !editor) return;

        // Validar tamaño (10MB máximo)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            setUploadStatus({ type: 'error', message: 'La imagen es muy grande. Máximo 10MB.' });
            return;
        }

        // Validar tipo
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setUploadStatus({ type: 'error', message: 'Tipo no permitido. Usa JPG, PNG, GIF o WebP.' });
            return;
        }

        setUploading(true);
        setUploadStatus(null);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            if (!csrfToken) {
                throw new Error('CSRF token not found');
            }

            const response = await fetch('/panel/upload/image', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                editor.chain().focus().setImage({ src: data.url }).run();
                setUploadStatus({ type: 'success', message: 'Imagen subida correctamente' });
            } else {
                const errorData = await response.json().catch(() => ({}));
                const errorMsg = errorData.errors?.image?.[0] || errorData.message || 'Error al subir la imagen';
                throw new Error(errorMsg);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus({ type: 'error', message: error.message || 'Error al subir la imagen' });
        } finally {
            setUploading(false);
        }
    }, [editor]);

    const addVideo = useCallback(async (file) => {
        if (!file || !editor) return;

        // Validar tamaño (50MB máximo)
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            setUploadStatus({ type: 'error', message: 'El video es muy grande. Máximo 50MB. Usa YouTube para videos más grandes.' });
            return;
        }

        // Validar tipo
        const allowedTypes = ['video/mp4', 'video/webm'];
        if (!allowedTypes.includes(file.type)) {
            setUploadStatus({ type: 'error', message: 'Tipo no permitido. Usa MP4 o WebM.' });
            return;
        }

        setUploading(true);
        setUploadStatus(null);

        const formData = new FormData();
        formData.append('video', file);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            if (!csrfToken) {
                throw new Error('CSRF token not found');
            }

            const response = await fetch('/panel/upload/video', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                editor.chain().focus().insertContent({ type: 'uploadedVideo', attrs: { src: data.url } }).run();
                setUploadStatus({ type: 'success', message: 'Video subido correctamente' });
            } else {
                const errorData = await response.json().catch(() => ({}));
                const errorMsg = errorData.errors?.video?.[0] || errorData.message || 'Error al subir el video';
                throw new Error(errorMsg);
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            setUploadStatus({ type: 'error', message: error.message || 'Error al subir el video' });
        } finally {
            setUploading(false);
        }
    }, [editor]);

    const addYoutubeVideo = useCallback(() => {
        const url = prompt('Ingresa la URL del video de YouTube:');
        if (url && editor) {
            editor.commands.setYoutubeVideo({ src: url });
        }
    }, [editor]);

    const setLink = useCallback(() => {
        if (!editor) return;

        const previousUrl = editor.getAttributes('link').href;
        const url = prompt('URL del enlace:', previousUrl);

        if (url === null) return;

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const handleImageClick = useCallback(() => {
        imageInputRef.current?.click();
    }, []);

    const handleVideoClick = useCallback(() => {
        videoInputRef.current?.click();
    }, []);

    // Handle paste images from clipboard
    useEffect(() => {
        if (!editor || !isFullscreen) return;

        const handlePaste = (event) => {
            const items = event.clipboardData?.items;
            if (!items) return;

            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    event.preventDefault();
                    const file = items[i].getAsFile();
                    if (file) {
                        addImage(file);
                    }
                    break;
                }
            }
        };

        const editorElement = document.querySelector('.ProseMirror');
        if (editorElement) {
            editorElement.addEventListener('paste', handlePaste);
            return () => editorElement.removeEventListener('paste', handlePaste);
        }
    }, [editor, isFullscreen, addImage]);

    if (!editor) return null;

    const hasContent = previewText.trim() !== '';

    return (
        <>
            {/* Compact view - button to open fullscreen editor */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Edit3 className="w-5 h-5 mr-3" />
                        <span className="font-medium">
                            {hasContent ? 'Editar contenido' : 'Agregar contenido'}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-400 group-hover:text-yellow-500 transition-colors">
                        <span className="text-sm mr-2">Abrir editor</span>
                        <Maximize2 className="w-5 h-5" />
                    </div>
                </button>
                
                {/* Preview text */}
                {hasContent && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {previewText}
                        </p>
                    </div>
                )}
            </div>

            {/* Fullscreen modal editor */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <Edit3 className="w-5 h-5 mr-2 text-yellow-500" />
                            Editor de contenido
                        </h2>
                        <button
                            type="button"
                            onClick={handleCloseFullscreen}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
                            title="Cerrar (ESC)"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Toolbar */}
                    <EditorToolbar
                        editor={editor}
                        uploading={uploading}
                        uploadStatus={uploadStatus}
                        onImageClick={handleImageClick}
                        onVideoClick={handleVideoClick}
                        onYoutubeClick={addYoutubeVideo}
                        onLinkClick={setLink}
                    />

                    {/* Editor area - full width */}
                    <div className="flex-1 overflow-auto bg-white dark:bg-gray-800">
                        <EditorContent editor={editor} className="h-full" />
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-end">
                        <button
                            type="button"
                            onClick={handleCloseFullscreen}
                            className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors"
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Listo
                        </button>
                    </div>
                    
                    {/* Hidden inputs for file uploads - inside modal */}
                    <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                addImage(e.target.files[0]);
                                e.target.value = '';
                            }
                        }}
                    />
                    <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/mp4,video/webm"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                addVideo(e.target.files[0]);
                                e.target.value = '';
                            }
                        }}
                    />
                </div>
            )}
        </>
    );
}

export default memo(TiptapEditor);
