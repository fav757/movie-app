import { addToList, removeFromList } from '../actions/listsActions';
import listReducer from './listsReducer';

describe('list Reducer', () => {
  test('should add items to state', () => {
    const initialstate = { favorite: [] };
    const resultState = listReducer(
      initialstate,
      addToList('1 tv', 'favorite'),
    );
    expect(resultState).toEqual({ favorite: ['1 tv'] });
  });

  test('should remove items from state', () => {
    const initialstate = { later: ['12 movie'] };
    const resultState = listReducer(
      initialstate,
      removeFromList('12 movie', 'later'),
    );
    expect(resultState).toEqual({ later: [] });
  });
});
