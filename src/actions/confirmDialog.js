export const CONFIRM = "CONFIRM";

export function confirm(args) {
  return {
    ...args,
    type: CONFIRM
  };
}
