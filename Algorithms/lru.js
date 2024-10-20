export class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  getItem(key) {
    const item = this.cache.get(key);

    if (item) {
      this.cache.delete(key);
      this.cache.set(key, item);
    }

    return item;
  }

  putItem(key, value) {
    // delete to refresh the insertion order
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // evict the oldest item in the cache
    else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.oldestItem);
    }

    this.cache.set(key, value);
  }

  get oldestItem() {
    return this.cache.keys().next().value;
  }
}
