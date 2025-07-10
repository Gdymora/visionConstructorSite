import type { Editor } from 'grapesjs';
import { commonTraits } from '../configs/traits';
import { ScriptComponent } from './Script/ScriptComponent';
import { ScriptComponentItem } from './Script/ScriptComponentItem';

export const PluginsScriptComponents = (editor: Editor) => {
    ScriptComponent(editor, commonTraits);
    ScriptComponentItem(editor, commonTraits);
};
