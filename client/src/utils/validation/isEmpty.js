const isEmpty = value => {
  let isEmpty = false;

  if (value === undefined || value === null) {
    return (isEmpty = true);
  }

  if (typeof value === "string" && value.trim().length === 0) {
    return (isEmpty = true);
  }

  if (value === 0) {
    return (isEmpty = true);
  }

  if (Array.isArray(value) && value.length === 0) {
    return (isEmpty = true);
  }

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return (isEmpty = true);
  }

  return isEmpty;
};

export default isEmpty;
