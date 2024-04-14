import React from 'react';
import { LuRedo2, LuUndo2 } from 'react-icons/lu';
import { ActionButtonsProps } from '../util/types';
import { Tooltip } from 'react-tooltip';

const ActionButtons: React.FC<ActionButtonsProps> = ({ undo, redo }) => {
    return (
        <div className="flex fixed bottom-4 left-8 px-4 py-6 justify-center rounded-lg items-center w-auto h-6 bg-gray-200">
            <button className="mr-3" onClick={undo} id="undoButton">
                <LuUndo2 size={'1.5em'} style={{ opacity: 0.8 }} />
                <Tooltip anchorSelect={`#undoButton`} place="top" offset={20}>
                    Undo
                </Tooltip>
            </button>
            <button className="ml-3" onClick={redo} id="redoButton">
                <LuRedo2 size={'1.5em'} style={{ opacity: 0.8 }} />
                <Tooltip anchorSelect={`#redoButton`} place="top" offset={20}>
                    Redo
                </Tooltip>
            </button>
        </div>
    );
};

export default ActionButtons;
