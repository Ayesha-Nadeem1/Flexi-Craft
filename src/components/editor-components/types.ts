import { EditorElement } from '../../pages/editor-provider'

export type Props = {
  element: EditorElement;
  onDrop: (element: EditorElement) => void;
  onDelete: (elementId: string, element: EditorElement) => void;
};
