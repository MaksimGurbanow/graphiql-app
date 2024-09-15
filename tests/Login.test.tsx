import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {IsLogedInContext} from '../app/context/loginContext';
import Login from '../app/routes/login/route';

describe('Login Component', () => {
    it('renders without crashing', () => {
        const isLoggedIn = [false, () => {
        }];

        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={isLoggedIn}>
                    <Login/>
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('form.signInHeading')).toBeInTheDocument();
    });
});
