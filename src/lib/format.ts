export function formatDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

export function formatDateTime(value: Date | null) {
  if (!value) {
    return "Not scheduled";
  }

  return value.toISOString().slice(0, 16).replace("T", " ");
}
