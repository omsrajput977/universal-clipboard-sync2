// apps/desktop/core/ConflictResolver.js

export class ConflictResolver {
  /**
   * Last Write Wins strategy
   */
  resolve(localItem, incomingItem) {
    if (!localItem) return incomingItem;
    if (!incomingItem) return localItem;

    return incomingItem.timestamp > localItem.timestamp
      ? incomingItem
      : localItem;
  }
}
