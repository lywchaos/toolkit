// result = a ?? b;
// is equal to
// result = (a !== null && a !== undefined) ? a : b;

// result = a ?? b ?? c ?? "default";
// is different from
// result = a || b || c || "default";
// because || return the first true, while ?? return the first non-null/none-undefined