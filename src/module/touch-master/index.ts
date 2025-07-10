import { Editor } from 'grapesjs';
import DragDropTouch from './DragDropTouch';
import touchpolyfill from './touchpolyfill';

export default (editor: Editor) => {
  touchpolyfill();
  DragDropTouch();
};
