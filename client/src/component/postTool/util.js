export default function onArrayCountUpdate(
  event,
  collection,
  count,
  onCollectionUpdate,
  onElemCountUpdate,
  elemBuilder
) {
  const value = Number(event.target.value);
  if (value < 1) return;

  let col = collection;

  const diff = value - count;

  if (diff < 0) {
    for (var k = diff; k < 0; k++) {
      col.pop();
    }
  } else {
    for (var i = count; i < value; i++) {
      col.push(elemBuilder(count));
    }
  }

  onElemCountUpdate(value);
  onCollectionUpdate(col);
}

export function validateInputs(requiredFields, setCanAdvance) {
  const hasAllRequiredFields = requiredFields.every((field) => field !== "");
  setCanAdvance(hasAllRequiredFields);
}
