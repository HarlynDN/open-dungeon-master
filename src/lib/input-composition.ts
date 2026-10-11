// React and native keyboard events both fit this shape. keyCode 229 covers
// Safari's composition-confirming Enter, where isComposing may already be
// false. Shared by text submitters and shortcut handlers.
export function isComposingInput(event: {
  isComposing?: boolean;
  keyCode?: number;
  nativeEvent?: { isComposing?: boolean; keyCode?: number };
}): boolean {
  return Boolean(event.isComposing || event.nativeEvent?.isComposing ||
    event.keyCode === 229 || event.nativeEvent?.keyCode === 229);
}
