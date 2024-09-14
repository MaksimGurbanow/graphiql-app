import { fireEvent, render, screen } from '@testing-library/react';
import DocumentationExplorer from '../app/components/documentationExplorer/DocumentationExplorer';
import { SchemaContext } from '../app/context/SchemaContext';
import '@testing-library/jest-dom';
import { within } from '@testing-library/react';

const mockSchema = {
    data: {
        __schema: {
            types: [
                {
                    name: 'Query',
                    kind: 'OBJECT',
                },
                {
                    name: 'Mutation',
                    kind: 'OBJECT',
                },
            ],
        },
    },
};

const renderWithSchema = (ui: JSX.Element) => {
    return render(
        <SchemaContext.Provider value={{ schema: mockSchema }}>
            {ui}
        </SchemaContext.Provider>
    );
};

describe('DocumentationExplorer Component', () => {
    it('should render the component with initial state', () => {
        renderWithSchema(<DocumentationExplorer />);
        expect(screen.getByText(/Documentation/i)).toBeInTheDocument();
    });

    it('should expand and collapse the accordion', () => {
        renderWithSchema(<DocumentationExplorer />);
        const accordionSummary = screen.getByText(/Documentation/i);

        fireEvent.click(accordionSummary);
        const rootTypesElement = screen.getByText(/Root Types/i);
        expect(rootTypesElement).toBeVisible();

        fireEvent.click(accordionSummary);
        expect(rootTypesElement).not.toBeVisible();
    });

    it('should render path segments and allow navigation', () => {
        renderWithSchema(<DocumentationExplorer />);
        const accordionSummary = screen.getByText(/Documentation/i);

        fireEvent.click(accordionSummary);

        const breadcrumbs = screen.getByRole('navigation');
        const rootSegment = within(breadcrumbs).getByText(/Root/i);

        expect(rootSegment).toBeInTheDocument();

        fireEvent.click(rootSegment);

        expect(screen.getByText(/Root Types/i)).toBeInTheDocument();
    });

    it('should display the correct header based on path segments', () => {
        renderWithSchema(<DocumentationExplorer />);
        const accordionSummary = screen.getByText(/Documentation/i);

        fireEvent.click(accordionSummary);
        expect(screen.getByText(/Root Types/i)).toBeInTheDocument();
    });
});
