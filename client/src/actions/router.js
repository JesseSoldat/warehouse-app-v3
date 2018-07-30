export const ROUTE_CHANGED = "ROUTE_CHANGED";

export const changeRoute = from => ({
  type: ROUTE_CHANGED,
  from
});
