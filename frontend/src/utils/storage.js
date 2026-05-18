const GUEST_CART_KEY = 'cart';

export function getCartKey(userId) {
  return userId ? `cart-${userId}` : GUEST_CART_KEY;
}

export function getFavoritesKey(userId) {
  return `favorites-${userId}`;
}

export function loadCart(userId) {
  try {
    const raw = localStorage.getItem(getCartKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(userId, items) {
  localStorage.setItem(getCartKey(userId), JSON.stringify(items));
}

export function loadFavorites(userId) {
  if (!userId) return [];
  try {
    const raw = localStorage.getItem(getFavoritesKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(userId, items) {
  if (!userId) return;
  localStorage.setItem(getFavoritesKey(userId), JSON.stringify(items));
}

export function mergeCarts(target, source) {
  const merged = [...target];
  for (const item of source) {
    const existing = merged.find(i => i.id === item.id);
    if (existing) {
      existing.qty += item.qty;
    } else {
      merged.push({ ...item });
    }
  }
  return merged;
}

export function mergeGuestCartIntoUser(userId) {
  const guestCart = loadCart(null);
  localStorage.removeItem(GUEST_CART_KEY);

  const userCart = loadCart(userId);
  const merged = mergeCarts(userCart, guestCart);
  saveCart(userId, merged);
  return merged;
}
