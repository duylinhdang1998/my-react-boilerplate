import { Action, HandleAction } from './types';

export function reducerFn<TState, TAction extends Action>(initialState: TState, objectActions: HandleAction<TState, TAction>) {
  return (state = initialState, action: Extract<TAction, { type: TAction['type'] }>): TState => {
    const { type } = action;
    const callback = objectActions[type];
    return typeof callback === 'function' ? callback({ state, action }) : state;
  };
}
