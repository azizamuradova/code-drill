import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@uiw/react-codemirror';

export default function CodeEditor({ value, onChange }) {
  return (
    <CodeMirror
      className='code-editor'
      value={value}
      theme={oneDark}
      extensions={[javascript()]}
      onChange={onChange}
    />
  );
}
