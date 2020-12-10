export interface ChangeGuestIdAction {
  type: string;
  payload: string;
}

export const changeGuestId = (id: string): ChangeGuestIdAction => ({
  type: 'CHANGE_SESSION_ID',
  payload: id,
});
