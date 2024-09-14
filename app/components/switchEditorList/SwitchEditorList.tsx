import classes from "./switchEditorList.module.scss";

export interface SwitchEditorListProps {
  editors: string[];
  setActiveEditor: (v: string) => void;
  activeEditor: string;
}

const SwitchEditorList = ({
  editors,
  setActiveEditor,
  activeEditor,
}: SwitchEditorListProps) => {
  return (
    <ul className={classes.switchEditorList}>
      {editors.map((editorMode) => (
        <li
          className={`${classes.switchEditorItem} ${
            activeEditor === editorMode && classes.active
          }`}
          key={editorMode}
          onClickCapture={() => setActiveEditor(editorMode)}
        >
          {editorMode}
        </li>
      ))}
    </ul>
  );
};

export default SwitchEditorList;
