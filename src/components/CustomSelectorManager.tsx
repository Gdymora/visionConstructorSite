import * as React from 'react';
import { SelectorsResultProps } from '@grapesjs/react';
import { mdiClose, mdiCheck, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MAIN_BORDER_COLOR, cx } from './common';
import { Input } from '@mui/material';

export default function CustomSelectorManager({
  selectors,
  selectedState,
  states,
  targets,
  setState,
  addSelector,
  removeSelector,
}: Omit<SelectorsResultProps, 'Container'>) {
  const addNewSelector = () => {
    const next = selectors.length + 1;
    addSelector({ name: `new-${next}`, label: `New ${next}` });
  };

  const [isAdding, setIsAdding] = React.useState(false);
  const [newSelectorName, setNewSelectorName] = React.useState('');

  const handleAddNewSelector = () => {
    if (newSelectorName.trim()) {
      addSelector({ name: newSelectorName.trim(), label: newSelectorName.trim() });
      setNewSelectorName('');
      setIsAdding(false);
    }
  };
  const targetStr = targets.join(', ');

  return (
    <div className="gjs-custom-selector-manager p-2 flex flex-col gap-2 text-left">
      <div className="flex items-center">
        <div className="flex-grow">Selectors</div>
        <FormControl size="small">
          <Select
            value={selectedState}
            onChange={(ev) => setState(ev.target.value)}
            displayEmpty
          >
            <MenuItem value="">- State -</MenuItem>
            {states.map((state) => (
              <MenuItem value={state.id} key={state.id}>
                {state.getName()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div
        className={cx(
          'flex items-center gap-2 flex-wrap p-2 bg-black/30 border rounded min-h-[45px]',
          MAIN_BORDER_COLOR
        )}
      >
        {targetStr && !isAdding ? (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className={cx('border rounded px-2 py-1')}
          >
            <Icon size={0.7} path={mdiPlus} />
          </button>
        ) : null}
        {isAdding ? (
          <div className="flex items-center gap-2">
            <Input
              autoFocus
              value={newSelectorName}
              onChange={(e) => setNewSelectorName(e.target.value)}
              placeholder="Enter selector name"
              onKeyDown={(e) => e.key === 'Enter' && handleAddNewSelector()}
            />
            <button type="button" onClick={handleAddNewSelector}>
              <Icon size={0.7} path={mdiCheck} />
            </button>
          </div>
        ) : null}
        {/* Render existing selectors */}
        {selectors.map((selector) => (
          <div
            key={selector.toString()}
            className="px-2 py-1 flex items-center gap-1 whitespace-nowrap bg-sky-500 rounded"
          >
            <div>{selector.getLabel()}</div>
            <button type="button" onClick={() => removeSelector(selector)}>
              <Icon size={0.7} path={mdiClose} />
            </button>
          </div>
        ))}
      </div>
      <div>
        Selected: <span className="opacity-70">{targetStr || 'None'}</span>
      </div>
    </div>
  );
}
