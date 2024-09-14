import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SwitchEditorList from '../app/components/switchEditorList/SwitchEditorList';
import classes from '../app/components/switchEditorList/switchEditorList.module.scss';

describe('SwitchEditorList', () => {
    it('renders editor items correctly', () => {
        const editors = ['Editor1', 'Editor2', 'Editor3'];
        const setActiveEditor = vi.fn();
        const activeEditor = 'Editor1';

        render(
            <SwitchEditorList
                editors={editors}
                setActiveEditor={setActiveEditor}
                activeEditor={activeEditor}
            />
        );

        editors.forEach((editor) => {
            expect(screen.getByText(editor)).toBeInTheDocument();
        });
    });

    it('applies the active class to the active editor', () => {
        const editors = ['Editor1', 'Editor2', 'Editor3'];
        const setActiveEditor = vi.fn();
        const activeEditor = 'Editor1';

        render(
            <SwitchEditorList
                editors={editors}
                setActiveEditor={setActiveEditor}
                activeEditor={activeEditor}
            />
        );

        const activeItem = screen.getByText('Editor1');
        expect(activeItem).toHaveClass(classes.active);
    });

    it('calls setActiveEditor when an editor is clicked', () => {
        const editors = ['Editor1', 'Editor2'];
        const setActiveEditor = vi.fn();
        const activeEditor = 'Editor1';

        render(
            <SwitchEditorList
                editors={editors}
                setActiveEditor={setActiveEditor}
                activeEditor={activeEditor}
            />
        );

        fireEvent.click(screen.getByText('Editor2'));

        expect(setActiveEditor).toHaveBeenCalledWith('Editor2');
    });
});

