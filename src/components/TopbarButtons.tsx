import * as React from 'react';
import { useEditor } from '@grapesjs/react';
import {
    mdiApplicationExport,
    mdiApplicationImport,
    mdiArrowULeftTop,
    mdiArrowURightTop,
    mdiBorderRadius,
    mdiCodeJson,
    mdiDelete,
    mdiFolderZip,
    mdiFullscreen,
    mdiHandBackLeftOff,
    mdiRadioboxIndeterminateVariant,
    mdiWeb,
    mdiXml,
} from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect, useState } from 'react';
import { BTN_CLS, MAIN_BORDER_COLOR, cx } from './common';
import { registerButton } from '../blocks/registerButtonPanel';
interface CommandButton {
    id: string;
    iconPath: string;
    options?: Record<string, any>;
    title?: string;
    disabled?: () => boolean;
}
// https://grapesjs.com/docs/modules/Commands.html#basic-configuration
export default function TopbarButtons({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const editor = useEditor();
    const [, setUpdateCounter] = useState(0);
    const { UndoManager, Commands } = editor;
    const cmdButtons: CommandButton[] = [
        {
            id: 'core:component-outline',
            iconPath: mdiBorderRadius,
        },
        {
            id: 'core:fullscreen',
            iconPath: mdiFullscreen,
            options: { target: '#root' },
        },
        {
          //  id: 'core:open-code',//grapesjs-component-code-editor
            id: 'component-code-editor',
            title: 'open-code',
            iconPath: mdiXml,
        },
        {
            id: 'save-json',
            title: 'save-json',
            iconPath: mdiApplicationExport,
        },
        {
            id: 'export-json-md',
            title: 'export-json',
            iconPath: mdiCodeJson,
        },
        {
            id: 'core:preview',
            iconPath: mdiWeb,
        },
        {
            id: 'core:undo',
            iconPath: mdiArrowULeftTop,
            disabled: () => !UndoManager.hasUndo(),
        },
        {
            id: 'core:redo',
            iconPath: mdiArrowURightTop,
            disabled: () => !UndoManager.hasRedo(),
        },
        {
            id: 'html-import',
            title: 'html-import',
            iconPath: 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z',
        },
        {
            id: 'json-import',
            title: 'json-import',
            iconPath: mdiApplicationImport,
        },
        {
            id: 'clear',
            iconPath: mdiDelete,
        },
        {
            id: 'change_mode',
            iconPath: mdiHandBackLeftOff,
        },
        {
            id: 'allowScripts',
            iconPath: mdiRadioboxIndeterminateVariant,
        },
        {
            id: 'gjs-export-zip',
            iconPath: mdiFolderZip,
        },
    ];

    useEffect(() => {
        const cmdEvent = 'run stop';
        const updateEvent = 'update';
        const updateCounter = () => setUpdateCounter((value) => value + 1);
        const onCommand = (id: string) => {
            cmdButtons.find((btn) => btn.id === id) && updateCounter();
        };
        editor.on(cmdEvent, onCommand);
        editor.on(updateEvent, updateCounter);
        registerButton(editor);

        return () => {
            editor.off(cmdEvent, onCommand);
            editor.off(updateEvent, updateCounter);
        };
    }, []);

    return (
        <div className={cx('flex gap-1', className)}>
            {cmdButtons.map(({ id, title, iconPath, disabled, options = {} }) => (
                <button
                    key={id}
                    type="button"
                    data-tooltip={title}
                    className={cx(BTN_CLS, MAIN_BORDER_COLOR, Commands.isActive(id) && 'text-sky-300', disabled?.() && 'opacity-50')}
                    onClick={() => (Commands.isActive(id) ? Commands.stop(id) : Commands.run(id, options))}
                    disabled={disabled?.()}
                >
                    <Icon path={iconPath} size={1} />
                </button>
            ))}
        </div>
    );
}
