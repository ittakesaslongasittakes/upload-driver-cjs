import xs from 'xstream';
import isolate from '@cycle/isolate';
import { extractSinks } from 'cyclejs-utils';

import { driverNames } from '../drivers';
import { routes } from '../routes';

export const defaultState: any = [];

export function App(sources: any): any {
    const initReducer$ = xs.of(
        prevState => (prevState === undefined ? defaultState : prevState)
    );

    const match$ = sources.router.define(routes);

    const componentSinks$ = match$.map(({ path, value }) => {
        const { component, scope } = value;
        return isolate(component, scope)({
            ...sources,
            router: sources.router.path(path)
        });
    });

    const sinks = extractSinks(componentSinks$, driverNames);
    return {
        ...sinks,
        onion: xs.merge(initReducer$, sinks.onion)
    };
}
