import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface IPostView {
  content: string;
}
export default function PostView({ content }: IPostView) {
  const editor = useEditor({ editable: false, extensions: [StarterKit], content });
  return (
    <>
      <RichTextEditor editor={editor} style={{ border: "none" }}>
        <RichTextEditor.Content mih={500} />
      </RichTextEditor>
    </>
  );
}
