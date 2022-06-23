export default function onArrayCountUpdate(
  event,
  collection,
  count,
  onCollectionUpdate = () => {},
  onElemCountUpdate = () => {},
  elemBuilder = () => {}
) {
  const value = Number(event.target.value);
  if (value < 1) return;

  let col = [...collection];

  const diff = value - count;

  if (diff < 0) {
    col = col.slice(0, col.length + diff);
  } else {
    for (var i = count; i < value; i++) {
      col.push(elemBuilder(count));
    }
  }

  onElemCountUpdate(value);
  onCollectionUpdate(col);
}

export function validateInputs(
  requiredFields,
  onCanAdvance,
  onParentUpdate,
  parentDataStruct
) {
  const hasAllRequiredFields = requiredFields.every((field) => field !== "");
  onCanAdvance(hasAllRequiredFields);
  if (hasAllRequiredFields) {
    onParentUpdate(parentDataStruct);
  }
}
