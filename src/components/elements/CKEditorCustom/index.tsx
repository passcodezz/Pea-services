/* eslint-disable @typescript-eslint/no-explicit-any */
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import styled, { css } from "styled-components";
interface EditorProps {
  value?: any;
  disabled?: boolean;
  onChange?: (v: any) => void;
}
interface ContainerProps {
  disabled?: boolean;
}

const config = {
  toolbar: [
    "undo",
    "redo",
    "heading",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    // 'fontSize',
    "|",
    "alignment",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "link",
    'imageInsert',
    "insertTable",
    "blockQuote",
    "codeBlock",
    "horizontalLine",
    "specialCharacters",
  ],
  // simpleUpload: {
  //   uploadUrl: "https://myserver.herokuapp.com/image-upload",
  // },
  // image: {
  //   toolbar: [
  //     "imageStyle:full",
  //     "imageStyle:side",
  //     "|",
  //     "imageTextAlternative",
  //   ],
  //   upload: { types: ["jpeg", "pdf", "docx"] },
  // },
  // placeholder: "Content",
  // extraPlugins: [uploadPlugin],
  removePlugins: ["Title"],
};

const Container = styled.div<ContainerProps>`
  .ck {
    .ck-toolbar.ck-toolbar_grouping,
    .ck-editor__main .ck-editor__editable.ck-read-only {
      ${(props: ContainerProps) =>
        props.disabled &&
        css`
          background: #f8f8f8;
        `};
    }
    .ck-content {
      ${(props: ContainerProps) =>
        props.disabled &&
        css`
          height: 20rem;
        `};
    }
  }
`;

const CKEditorCustom = ({ value, onChange, disabled }: EditorProps) => {
  return (
    <Container disabled>
      <CKEditor
        editor={ClassicEditor}
        config={config}
        data={value}
        disabled={disabled}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange?.({ data, ...event });
        }}
      />
    </Container>
  );
};

export default CKEditorCustom;
