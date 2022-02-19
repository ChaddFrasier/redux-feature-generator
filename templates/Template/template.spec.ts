import templateReducer, {
    fetchLinkAsync,
    updateState,
    templateState,
  } from './templateSlice';
  
  describe('counter reducer', () => {
    const initialState: templateState = {
      status: 'idle',
    };
    it('should handle initial state', () => {
      expect(templateReducer(undefined, { type: 'unknown' })).toEqual({
        status: 'idle',
      });
    });
  
    it('Should update the state when told', () => {
      const actualState = templateReducer(initialState, updateState('fetching'))
      expect(actualState.status).toBe('fetching');
    });
  });
  